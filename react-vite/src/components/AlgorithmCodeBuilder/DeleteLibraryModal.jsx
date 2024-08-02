import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteLibrary } from '../../redux/algorithmLibrary';
import { useModal } from '../../context/Modal';
import "./SaveAlgoModal.css";

const DeleteLibraryModal = ({ libraryId, onConfirm }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteLibrary(libraryId));
    onConfirm();
    closeModal();
  };

  return (
    <div className="delete-portfolio-modal">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <div>Are you sure you want to delete this library?</div>
        <div>This action cannot be undone.</div>
        <div className='button-container'>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLibraryModal;
