import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDelete = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={props.handleDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalDelete;
