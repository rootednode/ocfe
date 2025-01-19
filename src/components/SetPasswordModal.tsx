import React from 'react';
import Modal from 'react-modal';

// Set the root element for accessibility purposes
//Modal.setAppElement('#root');

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  content: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Custom Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          color: 'lightsteelblue',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <h2>Password</h2>
      <div>{content}</div>
      <button className="btn btn-success" onClick={onRequestClose}>Close Modal</button>
    </Modal>
  );
};

export default CustomModal;
