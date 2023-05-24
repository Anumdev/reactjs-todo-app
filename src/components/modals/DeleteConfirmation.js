import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const DeleteConfirmation = (props) => {
   return (
      <Modal
         {...props}
         size="md"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Delete Confirmation
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <p>Are you sure you want to delete this item?</p>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
               Cancel
            </Button>
            <Button variant="danger" onClick={props.onDelete}>
               Delete
            </Button>
         </Modal.Footer>
      </Modal>
   )
}
export default DeleteConfirmation