import {useForm} from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow.jsx";
import {useCreateCabin} from "./useCreateCabin.js";
import {useEditCabin} from "./useEditCabin.js";


function CreateCabinForm({cabinToEdit = {}}) {

    const {isCreating, createCabin} = useCreateCabin();
    const {isEditing, editCabin} = useEditCabin()

    const {
        id: editId,
        ...editValues
    } = cabinToEdit;

    const isEditSession = Boolean(editId);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState,
    } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const {errors} = formState;

    const isWorking = isCreating || isEditing;


    function onSubmit(data) {
        const image =
            data.image instanceof FileList && data.image.length > 0
                ? data.image[0]
                : cabinToEdit.image;

        const newCabinData = {
            ...data,
            image,
        };

        if (isEditSession) {
            editCabin({
                newCabinData,
                id: editId,
            }, {
                onSuccess: (data) => {
                    reset()
                }
            });
        } else {
            createCabin(newCabinData, {
                onSuccess: (data) => {
                    reset()
                },
            });
        }
    }


    function onError(errors) {
        // console.log(errors);
    }


    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
        >

            <FormRow
                label="Cabin name"
                error={errors?.name?.message}
            >
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "This field is required.",
                    })}
                />
            </FormRow>


            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This field is required.",

                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },

                        valueAsNumber: true,
                    })}
                />
            </FormRow>


            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regularPrice", {
                        required: "This field is required.",

                        min: {
                            value: 1,
                            message: "Price should be at least 1",
                        },

                        valueAsNumber: true,
                    })}
                />
            </FormRow>


            <FormRow
                label="Discount"
                error={errors?.discount?.message}
            >
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    {...register("discount", {
                        required: "This field is required.",

                        validate: (value) =>
                            value <= getValues("regularPrice") ||
                            "Discount should be less than regular price",

                        valueAsNumber: true,
                    })}
                />
            </FormRow>


            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    id="description"
                    disabled={isWorking}
                    {...register("description", {
                        required: "This field is required.",
                    })}
                />
            </FormRow>


            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isWorking}
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required.",
                    })}
                />
            </FormRow>


            <FormRow>
                <Button
                    variation="secondary"
                    type="reset"
                >
                    Cancel
                </Button>

                <Button disabled={isWorking}>
                    {isEditSession
                        ? "Edit cabin"
                        : "Create new cabin"}
                </Button>
            </FormRow>

        </Form>
    );
}

export default CreateCabinForm;