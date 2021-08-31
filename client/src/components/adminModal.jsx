
import Modal from "react-bootstrap/Modal";

function AdminModal({ handleClose, show, title, children }) {
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                <button type="button" className="close" onClick={handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
  };

  export default AdminModal;