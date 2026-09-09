import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
    const { data, error } = await supabase
        .from("cabins")
        .select("*");

    if (error) {
        console.error(error);
        throw new Error("cabins could not be loaded");
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from("cabins")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("cabin could not be deleted");
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    // آیا عکس جدید انتخاب شده؟
    const hasNewImage = newCabin.image instanceof File;
    // اگر عکس جدید داریم، اسم و مسیر جدید بساز
    const imageName = hasNewImage
        ? `${Math.random()}-${newCabin.image.name.replaceAll("/", "")}`
        : null;

    // اگر عکس جدید نداریم، همان URL قبلی را نگه می‌داریم
    const imagePath = hasNewImage
        ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
        : newCabin.image;

    let query = supabase.from("cabins");

    // CREATE
    if (!id) {
        query = query.insert([
            {
                ...newCabin,
                image: imagePath,
            },
        ]);
    }

    // EDIT
    if (id) {
        query = query
            .update({
                ...newCabin,
                image: imagePath,
            })
            .eq("id", id);
    }

    const { data, error } = await query
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error(
            id
                ? "cabin could not be edited"
                : "cabin could not be created"
        );
    }

    // فقط اگر عکس جدید داریم، آن را Upload کن
    if (hasNewImage) {
        const { error: storageError } = await supabase
            .storage
            .from("cabin-images")
            .upload(imageName, newCabin.image);

        if (storageError) {
            // فقط در حالت CREATE کابین را حذف کن
            if (!id) {
                await supabase
                    .from("cabins")
                    .delete()
                    .eq("id", data.id);
            }

            console.error(storageError);

            throw new Error(
                "cabin image could not be uploaded"
            );
        }
    }

    return data;
}