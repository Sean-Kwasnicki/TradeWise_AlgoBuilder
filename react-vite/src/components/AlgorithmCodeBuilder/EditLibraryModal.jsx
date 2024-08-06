import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editLibrary } from '../../redux/algorithmLibrary';
import { useModal } from '../../context/Modal';
import "./SaveAlgoModal.css";

const EditLibraryModal = ({ library, existingLibraries }) => {
  const [libraryName, setLibraryName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    if (library) {
      setLibraryName(library.name);
    }
  }, [library]);

  const handleSave = () => {
    if (!libraryName.trim()) {
      setError('Library name cannot be empty.');
      return;
    }

    if (existingLibraries.some(lib => lib.name.toLowerCase() === libraryName.trim().toLowerCase() && lib.id !== library.id)) {
      setError('Library name must be unique.');
      return;
    }

    setError('');
    dispatch(editLibrary({ id: library.id, name: libraryName.trim() }));
    closeModal();
  };

  return (
    <div className="login-form">
      <div className="modal-content">
        <h1>Edit Library</h1>
        <input
          type="text"
          value={libraryName}
          onChange={(e) => setLibraryName(e.target.value)}
          placeholder="Library Name"
        />
        {error && <p className="error">{error}</p>}
        <div className='button-container'>
          <button onClick={handleSave}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditLibraryModal;
