import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { userState, useEffect } from "react";
const ModalDelete = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Căm thù thằng Trần Hoàng Tuân: {props.dataModal.email}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={props.confirmDeleteUser}    
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default ModalDelete;