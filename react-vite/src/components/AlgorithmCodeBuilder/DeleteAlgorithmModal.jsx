import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAlgorithm } from '../../redux/algorithmLibrary';
import { useModal } from '../../context/Modal';
import "./SaveAlgoModal.css";

const DeleteAlgorithmModal = ({ libraryId, algorithmId, onConfirm }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteAlgorithm({ libraryId, algorithmId }));
    onConfirm(); 
    closeModal();
  };

  return (
    <div className="delete-portfolio-modal">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <div>Are you sure you want to delete this algorithm?</div>
        <div>This action cannot be undone.</div>
        <div className='button-container'>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlgorithmModal;
