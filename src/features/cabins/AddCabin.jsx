import Button from "../../ui/Button.jsx";
import {useState} from "react";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

function AddCabin() {
    return <Modal>
        <Modal.Open opens="cabin-form">
            <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.window name="cabin-form">
            <CreateCabinForm/>
        </Modal.window>

        {/*<Modal.Open opens="table">*/}
        {/*    <Button>Add new cabin</Button>*/}
        {/*</Modal.Open>*/}
        {/*<Modal.window name="table">*/}
        {/*    <CreateCabinForm/>*/}
        {/*</Modal.window>*/}
    </Modal>
}

// function AddCabin() {
//
//     const [isOpenModal, setIsOpenModal] = useState(false);
//
//     return (
//         <div>
//             <Button onClick={() => setIsOpenModal(show => !show)}>Add new cabin</Button>
//             {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
//                 <CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/>
//             </Modal>}
//         </div>
//     );
// }

export default AddCabin;