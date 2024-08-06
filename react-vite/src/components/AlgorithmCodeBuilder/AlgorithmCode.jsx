import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlgorithmCode, fetchAlgorithmCodeSuccess } from '../../redux/algorithmCode';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
import DropZone from './DropZone';
import AlgoLibrary from './AlgoLibrary';
import SaveAlgoModal from './SaveAlgoModal';
import CustomInputModal from './CustomInputModal';
import { useModal } from '../../context/Modal';
import AlgoTradingViewWidget from '../SmartChart/AlgoChart';
import './AlgorithmCode.css';

const AlgorithmCode = () => {
  const dispatch = useDispatch();
  const algorithmCode = useSelector((state) => state.algorithmCode.code);
  const error = useSelector((state) => state.algorithmCode.error);
  const loading = useSelector((state) => state.algorithmCode.loading);

  const [indicatorType, setIndicatorType] = useState('');
  const [droppedItem, setDroppedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [studies, setStudies] = useState([]);
  const [symbol, setSymbol] = useState('');
  const { setModalContent, closeModal } = useModal();

  const handleDrop = (type) => {
    setIndicatorType(type);
    setDroppedItem(type);
    setSymbol(''); // Reset the symbol state
    setModalContent(
      <CustomInputModal
        show={true}
        onClose={() => {
          closeModal();
          // setIndicatorType('');
          setDroppedItem(null);
        }}
        indicatorType={type}
        onSubmit={(data) => {
          setFormData(data);
          setSymbol(data.symbol);
          setStudies([type]);
          closeModal();
        }}
      />
    );
  };

  const handleGenerateCode = () => {
    if (indicatorType) {
      dispatch(fetchAlgorithmCode(indicatorType, formData));
      setIndicatorType('');
      setDroppedItem(null);
    }
  };

  const handleResetCodeDisplay = () => {
    dispatch(fetchAlgorithmCodeSuccess(''));
  };

  const openSaveModal = () => {
    setModalContent(
      <SaveAlgoModal
        show={true}
        onClose={closeModal}
        algorithmCode={algorithmCode}
      />
    );
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="algorithm-code-container">
        <div className="background-logo-compare"></div>
        <div className="input-container">
          <div className="drag-items">
            {['sma', 'rsi', 'macd', 'bollinger_bands', 'stochastic', 'parabolic_sar', 'atr', 'cci', 'ichimoku_cloud'].map((type) => (
              !droppedItem || droppedItem !== type ? <DragItem key={type} type={type} label={type.toUpperCase().replace('_', ' ')} /> : null
            ))}
          </div>
          <DropZone onDrop={handleDrop} droppedItem={droppedItem} />
          <button
            className="generate-code-button"
            onClick={handleGenerateCode}
            disabled={loading || !droppedItem || Object.keys(formData).length === 0}
          >
            {loading ? 'Generating...' : 'Generate Code'}
          </button>
          <AlgoLibrary onSelectAlgorithm={(code) => dispatch(fetchAlgorithmCodeSuccess(code))} resetCodeDisplay={handleResetCodeDisplay} />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="code-display">
          <pre>{algorithmCode || 'Your Custom Algorithm Code Will Generate Here'}</pre>
          {algorithmCode && (
            <>
              <div className='code-button'>
                <button onClick={() => navigator.clipboard.writeText(algorithmCode)}>Copy Code</button>
                <button onClick={openSaveModal}>Add to Library</button>
              </div>
            </>
          )}
        <div className="disclaimer">
          <p><strong>Disclaimer:</strong> The trading algorithms provided on this site are for educational purposes only. They are not intended as financial advice. Please consult with a financial advisor before making any trading decisions. The creators of this site are not liable for any financial losses incurred from the use of these algorithms.</p>
        </div>
        </div>
        <div className="tradingview-container">
          <AlgoTradingViewWidget symbol={symbol} studies={studies} />
        </div>
      </div>
    </DndProvider>
  );
};

export default AlgorithmCode;


