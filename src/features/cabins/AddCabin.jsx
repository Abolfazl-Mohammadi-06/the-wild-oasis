import Button from "../../ui/Button.jsx";
import {useState} from "react";
import Modal from "../../ui/Modal.jsx";

function AddCabin() {

    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsOpenModal(show => !show)}>Add new cabin</Button>
            {isOpenModal && <Modal/>}
        </div>
    );
}

export default AddCabin;