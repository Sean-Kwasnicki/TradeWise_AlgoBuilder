import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { addAlgorithm } from '../../redux/algorithmLibrary';
import "./SaveAlgoModal.css";

const SaveAlgorithmModal = ({ show, algorithmCode }) => {
  const dispatch = useDispatch();
  const libraries = useSelector((state) => state.algorithmLibrary.libraries);
  const [selectedLibrary, setSelectedLibrary] = useState('');
  const [algoName, setAlgoName] = useState('');
  const [error, setError] = useState('');
  const { closeModal } = useModal();

  const handleSaveAlgorithm = () => {
    if (!selectedLibrary) {
      setError('Please select a library.');
      return;
    }

    if (!algoName.trim()) {
      setError('Algorithm name cannot be empty.');
      return;
    }

    const library = libraries.find(lib => lib.id === parseInt(selectedLibrary));
    const existingAlgorithm = library.algorithms.find(
      (algorithm) => algorithm.name.toLowerCase() === algoName.trim().toLowerCase()
    );

    if (existingAlgorithm) {
      setError('Algorithm name must be unique within the library.');
      return;
    }

    setError('');
    const newAlgorithm = {
      id: Date.now(),
      name: algoName.trim(),
      code: algorithmCode,
    };
    dispatch(addAlgorithm({ libraryId: library.id, algorithm: newAlgorithm }));
    closeModal();
    setAlgoName('');
    setSelectedLibrary('');
  };

  if (!show) return null;

  return (
    <div className="login-form">
      <h1>Save Algorithm to Library</h1>
      <select
        value={selectedLibrary}
        onChange={(e) => setSelectedLibrary(e.target.value)}
      >
        <option value="">Select Library</option>
        {libraries.map(library => (
          <option key={library.id} value={library.id}>
            {library.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Algorithm Name"
        value={algoName}
        onChange={(e) => setAlgoName(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <div className='button-container'>
        <button onClick={handleSaveAlgorithm}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default SaveAlgorithmModal;
