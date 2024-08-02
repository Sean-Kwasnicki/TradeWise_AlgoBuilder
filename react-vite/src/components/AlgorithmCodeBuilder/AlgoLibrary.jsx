import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import {
  fetchLibraries, addLibrary, deleteLibrary, editLibrary,
  fetchAlgorithms, addAlgorithm, deleteAlgorithm, editAlgorithm
} from '../../redux/algorithmLibrary';
import EditLibraryModal from './EditLibraryModal';
import DeleteLibraryModal from './DeleteLibraryModal';
import EditAlgorithmModal from './EditAlgorithmModal';
import DeleteAlgorithmModal from './DeleteAlgorithmModal';
import './AlgoLibrary.css';

const AlgoLibrary = ({ onSelectAlgorithm, resetCodeDisplay }) => {
  const dispatch = useDispatch();
  const libraries = useSelector((state) => state.algorithmLibrary.libraries);
  const [libraryName, setLibraryName] = useState('');
  const [algorithmName, setAlgorithmName] = useState('');
  const [loading, setLoading] = useState({});
  const [algorithmsVisible, setAlgorithmsVisible] = useState({});
  const [activeLibrary, setActiveLibrary] = useState(null);
  const [error, setError] = useState('');
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchLibraries());
  }, [dispatch]);

  const fetchAlgorithmsForLibrary = async (libraryId) => {
    setLoading((prev) => ({ ...prev, [libraryId]: true }));
    await dispatch(fetchAlgorithms(libraryId));
    setLoading((prev) => ({ ...prev, [libraryId]: false }));
  };

  const handleToggleLibrary = (library) => {
    setAlgorithmsVisible((prev) => {
      const isVisible = !prev[library.id];
      if (isVisible && !library.algorithms) {
        fetchAlgorithmsForLibrary(library.id);
      }
      return { ...prev, [library.id]: isVisible };
    });
    setActiveLibrary(library);
  };

  const handleAddLibrary = () => {
    const trimmedLibraryName = libraryName.trim();

    if (trimmedLibraryName === '') {
      setError('Library name cannot be empty or whitespace.');
      return;
    }

    const existingLibrary = libraries.find(
      (library) => library.name.toLowerCase() === trimmedLibraryName.toLowerCase()
    );

    if (existingLibrary) {
      setError('There is already an Algorithm Library with that name.');
      return;
    }

    const newLibrary = {
      id: Date.now(),
      name: trimmedLibraryName,
      algorithms: [],
    };

    dispatch(addLibrary(newLibrary));
    setLibraryName('');
    setError('');
  };

  const handleEditLibrary = (library) => {
    setModalContent(
      <EditLibraryModal
        library={library}
        onSave={(updatedLibrary) => {
          dispatch(editLibrary(updatedLibrary));
          if (activeLibrary && activeLibrary.id === library.id) {
            setActiveLibrary({ ...activeLibrary, name: updatedLibrary.name });
          }
        }}
        existingLibraries={libraries}
      />
    );
  };

  const handleDeleteLibrary = (library) => {
    setModalContent(
      <DeleteLibraryModal
        library={library}
        onConfirm={() => {
          dispatch(deleteLibrary(library.id));
          if (activeLibrary && activeLibrary.id === library.id) {
            setActiveLibrary(null);
          }
        }}
      />
    );
  };

  const handleAddAlgorithm = () => {
    if (algorithmName && activeLibrary) {
      const existingAlgorithm = activeLibrary.algorithms.find(
        (algorithm) => algorithm.name.toLowerCase() === algorithmName.toLowerCase()
      );
      if (existingAlgorithm) {
        setError('There is already an Algorithm with that name within this Library.');
        return;
      }
      const newAlgorithm = {
        id: Date.now(),
        name: algorithmName,
        code: '',
      };
      dispatch(addAlgorithm({ libraryId: activeLibrary.id, algorithm: newAlgorithm }));
      setAlgorithmName('');
      setActiveLibrary((prevActiveLibrary) => ({
        ...prevActiveLibrary,
        algorithms: [...prevActiveLibrary.algorithms, newAlgorithm],
      }));
      setError('');
    }
  };

  const handleEditAlgorithm = (libraryId, algorithm) => {
    setModalContent(
      <EditAlgorithmModal
        algorithm={algorithm}
        onSave={(newName) => {
          const existingAlgorithm = activeLibrary.algorithms.find(
            (alg) => alg.name.toLowerCase() === newName.toLowerCase() && alg.id !== algorithm.id
          );
          if (existingAlgorithm) {
            setError('Algorithm name must be unique within the library.');
            return;
          }
          dispatch(editAlgorithm({ libraryId, algorithmId: algorithm.id, updates: { name: newName } }));
          if (activeLibrary && activeLibrary.id === libraryId) {
            const updatedAlgorithms = activeLibrary.algorithms.map((alg) =>
              alg.id === algorithm.id ? { ...alg, name: newName } : alg
            );
            setActiveLibrary({ ...activeLibrary, algorithms: updatedAlgorithms });
          }
        }}
      />
    );
  };

  const handleDeleteAlgorithm = (libraryId, algorithmId) => {
    setModalContent(
      <DeleteAlgorithmModal
        onConfirm={() => {
          dispatch(deleteAlgorithm({ libraryId, algorithmId }));
          if (activeLibrary && activeLibrary.id === libraryId) {
            const updatedAlgorithms = activeLibrary.algorithms.filter((alg) => alg.id !== algorithmId);
            setActiveLibrary({ ...activeLibrary, algorithms: updatedAlgorithms });
          }
        }}
      />
    );
  };

  return (
    <div className="algo-library-container">
      <div className="library-actions">
        <input
          type="text"
          placeholder="Library Name"
          value={libraryName}
          onChange={(e) => setLibraryName(e.target.value)}
        />
        <button onClick={handleAddLibrary}>Add Library</button>
        <button onClick={resetCodeDisplay}>Reset Code Display</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="library-list">
        <h3>Algorithm Libraries</h3>
        <ul>
          {libraries.map((library) => (
            <li key={library.id}>
              <span onClick={() => handleToggleLibrary(library)}>{library.name}</span>
              <div className="stock-buttons">
                <button onClick={() => handleEditLibrary(library)}>Edit Library</button>
                <button onClick={() => handleDeleteLibrary(library)}>Delete Library</button>
                <button onClick={() => handleToggleLibrary(library)}>
                  {algorithmsVisible[library.id] ? 'Hide Algorithms' : 'View Algorithms'}
                </button>
              </div>
              {algorithmsVisible[library.id] && (
                <div className='algo-list'>
                  <h4>Algorithms</h4>
                  {loading[library.id] ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      {library.algorithms.length === 0 ? (
                        <p>Please add an algorithm to this library.</p>
                      ) : (
                        <ul>
                          {library.algorithms?.map((algorithm) => (
                            <li key={algorithm.id}>
                              <span>{algorithm.name}</span>
                              <div className='stock-buttons'>
                                <button onClick={() => handleEditAlgorithm(library.id, algorithm)}>Edit Algorithm</button>
                                <button onClick={() => handleDeleteAlgorithm(library.id, algorithm.id)}>Delete Algorithm</button>
                                <button onClick={() => onSelectAlgorithm(algorithm.code)}>Show Code</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlgoLibrary;
