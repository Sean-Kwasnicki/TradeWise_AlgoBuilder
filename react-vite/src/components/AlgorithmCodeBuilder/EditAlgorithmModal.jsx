import React, { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import "./SaveAlgoModal.css";

const EditAlgorithmModal = ({ algorithm, onSave, existingAlgorithms }) => {
  const [algorithmName, setAlgorithmName] = useState('');
  const [error, setError] = useState('');
  const { closeModal } = useModal();

  useEffect(() => {
    if (algorithm) {
      setAlgorithmName(algorithm.name);
    }
  }, [algorithm]);

  const handleSave = () => {
    if (!algorithmName.trim()) {
      setError('Algorithm name cannot be empty.');
      return;
    }

    if (existingAlgorithms.some(algo => algo.name.toLowerCase() === algorithmName.trim().toLowerCase() && algo.id !== algorithm.id)) {
      setError('Algorithm name must be unique.');
      return;
    }

    setError('');
    onSave(algorithmName.trim());
    closeModal();
  };

  return (
    <div className="login-form">
      <div className="modal-content">
        <h2>Edit Algorithm</h2>
        <input
          type="text"
          value={algorithmName}
          onChange={(e) => setAlgorithmName(e.target.value)}
          placeholder="Algorithm Name"
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

export default EditAlgorithmModal;
