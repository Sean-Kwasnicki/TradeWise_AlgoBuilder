import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '../../context/Modal';
import './CustomInputModal.css';

const CustomInputModal = ({ show, onClose, onSubmit, indicatorType }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);
  const { closeModal } = useModal();

  useEffect(() => {
    if (show) {
      setFormData({});
      setErrors({});
      setSubmitted(false);
    }
  }, [show]);

  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [formData, submitted]);

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = getRequiredFields();

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = 'This field is required';
      } else if (!isNaN(formData[field]) && Number(formData[field]) < 0) {
        newErrors[field] = 'Value cannot be negative';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'symbol' ? value.toUpperCase().trim() : value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validateForm()) {
      onSubmit(formData);
      closeModal();
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
      closeModal();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  const getRequiredFields = () => {
    switch (indicatorType) {
      case 'sma':
        return ['symbol', 'quantity', 'barSizeSetting', 'fast_sma', 'slow_sma'];
      case 'rsi':
        return ['symbol', 'quantity', 'barSizeSetting', 'period', 'buy_threshold', 'sell_threshold'];
      case 'macd':
        return ['symbol', 'quantity', 'barSizeSetting', 'fast_period', 'slow_period', 'signal_period'];
      case 'bollinger_bands':
        return ['symbol', 'quantity', 'barSizeSetting', 'period', 'std_dev'];
      case 'stochastic':
        return ['symbol', 'quantity', 'barSizeSetting', 'k_period', 'd_period', 'buy_threshold', 'sell_threshold'];
      case 'parabolic_sar':
        return ['symbol', 'quantity', 'barSizeSetting', 'af_step', 'af_max'];
      case 'atr':
        return ['symbol', 'quantity', 'barSizeSetting', 'period', 'buy_threshold', 'sell_threshold'];
      case 'cci':
        return ['symbol', 'quantity', 'barSizeSetting', 'period', 'buy_threshold', 'sell_threshold'];
      case 'williams_r':
        return ['symbol', 'quantity', 'barSizeSetting', 'period', 'buy_threshold', 'sell_threshold'];
      default:
        return [];
    }
  };

  const getFields = () => {
    switch (indicatorType) {
      case 'sma':
        return (
          <>
            <label>Stock Symbol:</label>
            <input name="symbol" type="text" placeholder="Symbol (e.g., AAPL)" onChange={handleChange} />
            {submitted && errors.symbol && <span className="error">{errors.symbol}</span>}
            <label>Quantity:</label>
            <input name="quantity" type="number" placeholder="Quantity (Number of shares to trade, e.g., 10)" onChange={handleChange} />
            {submitted && errors.quantity && <span className="error">{errors.quantity}</span>}
            <label>Bar Size Setting:</label>
            <input name="barSizeSetting" type="text" placeholder="Bar Size (Time interval for bars, e.g., 5 mins)" onChange={handleChange} />
            {submitted && errors.barSizeSetting && <span className="error">{errors.barSizeSetting}</span>}
            <label>Fast SMA Period:</label>
            <input name="fast_sma" type="number" placeholder="Fast SMA (Shorter period, e.g., 20)" onChange={handleChange} />
            {submitted && errors.fast_sma && <span className="error">{errors.fast_sma}</span>}
            <label>Slow SMA Period:</label>
            <input name="slow_sma" type="number" placeholder="Slow SMA (Longer period, e.g., 50)" onChange={handleChange} />
            {submitted && errors.slow_sma && <span className="error">{errors.slow_sma}</span>}
          </>
        );
      case 'rsi':
        return (
          <>
            <label>Stock Symbol:</label>
            <input name="symbol" type="text" placeholder="Symbol (e.g., AAPL)" onChange={handleChange} />
            {submitted && errors.symbol && <span className="error">{errors.symbol}</span>}
            <label>Quantity:</label>
            <input name="quantity" type="number" placeholder="Quantity (Number of shares to trade, e.g., 10)" onChange={handleChange} />
            {submitted && errors.quantity && <span className="error">{errors.quantity}</span>}
            <label>Bar Size Setting:</label>
            <input name="barSizeSetting" type="text" placeholder="Bar Size (Time interval for bars, e.g., 5 mins)" onChange={handleChange} />
            {submitted && errors.barSizeSetting && <span className="error">{errors.barSizeSetting}</span>}
            <label>RSI Period:</label>
            <input name="period" type="number" placeholder="Period (Number of bars for calculation, e.g., 14)" onChange={handleChange} />
            {submitted && errors.period && <span className="error">{errors.period}</span>}
            <label>Buy Threshold:</label>
            <input name="buy_threshold" type="number" placeholder="Buy Threshold (RSI level to buy, e.g., 30)" onChange={handleChange} />
            {submitted && errors.buy_threshold && <span className="error">{errors.buy_threshold}</span>}
            <label>Sell Threshold:</label>
            <input name="sell_threshold" type="number" placeholder="Sell Threshold (RSI level to sell, e.g., 70)" onChange={handleChange} />
            {submitted && errors.sell_threshold && <span className="error">{errors.sell_threshold}</span>}
          </>
        );
      case 'macd':
        return (
          <>
            <label>Stock Symbol:</label>
            <input name="symbol" type="text" placeholder="Symbol (e.g., AAPL)" onChange={handleChange} />
            {submitted && errors.symbol && <span className="error">{errors.symbol}</span>}
            <label>Quantity:</label>
            <input name="quantity" type="number" placeholder="Quantity (Number of shares to trade, e.g., 10)" onChange={handleChange} />
            {submitted && errors.quantity && <span className="error">{errors.quantity}</span>}
            <label>Bar Size Setting:</label>
            <input name="barSizeSetting" type="text" placeholder="Bar Size (Time interval for bars, e.g., 5 mins)" onChange={handleChange} />
            {submitted && errors.barSizeSetting && <span className="error">{errors.barSizeSetting}</span>}
            <label>Fast Period:</label>
            <input name="fast_period" type="number" placeholder="Fast Period (Shorter EMA period, e.g., 12)" onChange={handleChange} />
            {submitted && errors.fast_period && <span className="error">{errors.fast_period}</span>}
            <label>Slow Period:</label>
            <input name="slow_period" type="number" placeholder="Slow Period (Longer EMA period, e.g., 26)" onChange={handleChange} />
            {submitted && errors.slow_period && <span className="error">{errors.slow_period}</span>}
            <label>Signal Period:</label>
            <input name="signal_period" type="number" placeholder="Signal Period (Signal line EMA period, e.g., 9)" onChange={handleChange} />
            {submitted && errors.signal_period && <span className="error">{errors.signal_period}</span>}
          </>
        );
      case 'bollinger_bands':
        return (
          <>
            <label>Stock Symbol:</label>
            <input name="symbol" type="text" placeholder="Symbol (e.g., AAPL)" onChange={handleChange} />
            {submitted && errors.symbol && <span className="error">{errors.symbol}</span>}
            <label>Quantity:</label>
            <input name="quantity" type="number" placeholder="Quantity (Number of shares to trade, e.g., 10)" onChange={handleChange} />
            {submitted && errors.quantity && <span className="error">{errors.quantity}</span>}
            <label>Bar Size Setting:</label>
            <input name="barSizeSetting" type="text" placeholder="Bar Size (Time interval for bars, e.g., 5 mins)" onChange={handleChange} />
            {submitted && errors.barSizeSetting && <span className="error">{errors.barSizeSetting}</span>}
            <label>Period:</label>
            <input name="period" type="number" placeholder="Period (Number of bars for SMA, e.g., 20)" onChange={handleChange} />
            {submitted && errors.period && <span className="error">{errors.period}</span>}
            <label>Standard Deviation:</label>
            <input name="std_dev" type="number" placeholder="Standard Deviation (Multiplier for bands, e.g., 2)" onChange={handleChange} />
            {submitted && errors.std_dev && <span className="error">{errors.std_dev}</span>}
          </>
        );
      case 'stochastic':
        return (
          <>
            <label>Stock Symbol:</label>
            <input name="symbol" type="text" placeholder="Symbol (e.g., AAPL)" onChange={handleChange} />
            {submitted && errors.symbol && <span className="error">{errors.symbol}</span>}
            <label>Quantity:</label>
            <input name="quantity" type="number" placeholder="Quantity (Number of shares to trade, e.g., 10)" onChange={handleChange} />
            {submitted && errors.quantity && <span className="error">{errors.quantity}</span>}
            <label>Bar Size Setting:</label>
            <input name="barSizeSetting" type="text" placeholder="Bar Size (Time interval for bars, e.g., 5 mins)" onChange={handleChange} />
            {submitted && errors.barSizeSetting && <span className="error">{errors.barSizeSetting}</span>}
            <label>K Period:</label>
            <input name="k_period" type="number" placeholder="K Period (Lookback period, e.g., 14)" onChange={handleChange} />
            {submitted && errors.k_period && <span className="error">{errors.k_period}</span>}
            <label>D Period:</label>
            <input name="d_period" type="number" placeholder="D Period (Smoothing period, e.g., 3)" onChange={handleChange} />
            {submitted && errors.d_period && <span className="error">{errors.d_period}</span>}
            <label>Buy Threshold:</label>
            <input name="buy_threshold" type="number" placeholder="Buy Threshold (Stochastic level to buy, e.g., 20)" onChange={handleChange} />
            {submitted && errors.buy_threshold && <span className="error">{errors.buy_threshold}</span>}
            <label>Sell Threshold:</label>
            <input name="sell_threshold" type="number" placeholder="Sell Threshold (Stochastic level to sell, e.g., 80)" onChange={handleChange} />
            {submitted && errors.sell_threshold && <span className="error">{errors.sell_threshold}</span>}
          </>
        );
      case 'parabolic_sar':
        return (
          <>
            <label>Stock Symbol:</label>
            <input name="symbol" type="text" placeholder="Symbol (e.g., AAPL)" onChange={handleChange} />
            {submitted && errors.symbol && <span className="error">{errors.symbol}</span>}
            <label>Quantity:</label>
            <input name="quantity" type="number" placeholder="Quantity (Number of shares to trade, e.g., 10)" onChange={handleChange} />
            {submitted && errors.quantity && <span className="error">{errors.quantity}</span>}
            <label>Bar Size Setting:</label>
            <input name="barSizeSetting" type="text" placeholder="Bar Size (Time interval for bars, e.g., 5 mins)" onChange={handleChange} />
            {submitted && errors.barSizeSetting && <span className="error">{errors.barSizeSetting}</span>}
            <label>AF Step:</label>
            <input name="af_step" type="number" placeholder="AF Step (Acceleration factor step, e.g., 0.02)" onChange={handleChange} />
            {submitted && errors.af_step && <span className="error">{errors.af_step}</span>}
            <label>AF Max:</label>
            <input name="af_max" type="number" placeholder="AF Max (Maximum AF value, e.g., 0.2)" onChange={handleChange} />
            {submitted && errors.af_max && <span className="error">{errors.af_max}</span>}
          </>
        );
      case 'atr':
        return (
          <>
            <label>Stock Symbol:</label>
            <input name="symbol" type="text" placeholder="Symbol (e.g., AAPL)" onChange={handleChange} />
            {submitted && errors.symbol && <span className="error">{errors.symbol}</span>}
            <label>Quantity:</label>
            <input name="quantity" type="number" placeholder="Quantity (Number of shares to trade, e.g., 10)" onChange={handleChange} />
            {submitted && errors.quantity && <span className="error">{errors.quantity}</span>}
            <label>Bar Size Setting:</label>
            <input name="barSizeSetting" type="text" placeholder="Bar Size (Time interval for bars, e.g., 5 mins)" onChange={handleChange} />
            {submitted && errors.barSizeSetting && <span className="error">{errors.barSizeSetting}</span>}
            <label>Period:</label>
            <input name="period" type="number" placeholder="Period (Number of bars for ATR, e.g., 14)" onChange={handleChange} />
            {submitted && errors.period && <span className="error">{errors.period}</span>}
            <label>Buy Threshold:</label>
            <input name="buy_threshold" type="number" placeholder="Buy Threshold (ATR value to buy, e.g., 2)" onChange={handleChange} />
            {submitted && errors.buy_threshold && <span className="error">{errors.buy_threshold}</span>}
            <label>Sell Threshold:</label>
            <input name="sell_threshold" type="number" placeholder="Sell Threshold (ATR value to sell, e.g., 5)" onChange={handleChange} />
            {submitted && errors.sell_threshold && <span className="error">{errors.sell_threshold}</span>}
          </>
        );
      case 'cci':
        return (
          <>
            <label>Stock Symbol:</label>
            <input name="symbol" type="text" placeholder="Symbol (e.g., AAPL)" onChange={handleChange} />
            {submitted && errors.symbol && <span className="error">{errors.symbol}</span>}
            <label>Quantity:</label>
            <input name="quantity" type="number" placeholder="Quantity (Number of shares to trade, e.g., 10)" onChange={handleChange} />
            {submitted && errors.quantity && <span className="error">{errors.quantity}</span>}
            <label>Bar Size Setting:</label>
            <input name="barSizeSetting" type="text" placeholder="Bar Size (Time interval for bars, e.g., 5 mins)" onChange={handleChange} />
            {submitted && errors.barSizeSetting && <span className="error">{errors.barSizeSetting}</span>}
            <label>Period:</label>
            <input name="period" type="number" placeholder="Period (Number of bars for CCI, e.g., 20)" onChange={handleChange} />
            {submitted && errors.period && <span className="error">{errors.period}</span>}
            <label>Buy Threshold:</label>
            <input name="buy_threshold" type="number" placeholder="Buy Threshold (CCI level to buy, e.g., -100)" onChange={handleChange} />
            {submitted && errors.buy_threshold && <span className="error">{errors.buy_threshold}</span>}
            <label>Sell Threshold:</label>
            <input name="sell_threshold" type="number" placeholder="Sell Threshold (CCI level to sell, e.g., 100)" onChange={handleChange} />
            {submitted && errors.sell_threshold && <span className="error">{errors.sell_threshold}</span>}
          </>
        );
      case 'williams_r':
        return (
          <>
            <label>Stock Symbol:</label>
            <input name="symbol" type="text" placeholder="Symbol (e.g., AAPL)" onChange={handleChange} />
            {submitted && errors.symbol && <span className="error">{errors.symbol}</span>}
            <label>Quantity:</label>
            <input name="quantity" type="number" placeholder="Quantity (Number of shares to trade, e.g., 10)" onChange={handleChange} />
            {submitted && errors.quantity && <span className="error">{errors.quantity}</span>}
            <label>Bar Size Setting:</label>
            <input name="barSizeSetting" type="text" placeholder="Bar Size (Time interval for bars, e.g., 5 mins)" onChange={handleChange} />
            {submitted && errors.barSizeSetting && <span className="error">{errors.barSizeSetting}</span>}
            <label>Period:</label>
            <input name="period" type="number" placeholder="Period (Number of bars for Williams %R, e.g., 14)" onChange={handleChange} />
            {submitted && errors.period && <span className="error">{errors.period}</span>}
            <label>Buy Threshold:</label>
            <input name="buy_threshold" type="number" placeholder="Buy Threshold (Williams %R value to buy, e.g., -80)" onChange={handleChange} />
            {submitted && errors.buy_threshold && <span className="error">{errors.buy_threshold}</span>}
            <label>Sell Threshold:</label>
            <input name="sell_threshold" type="number" placeholder="Sell Threshold (Williams %R value to sell, e.g., -20)" onChange={handleChange} />
            {submitted && errors.sell_threshold && <span className="error">{errors.sell_threshold}</span>}
          </>
        );
      case 'ichimoku_cloud':
        return (
          <>
            <label>Stock Symbol:</label>
            <input name="symbol" type="text" placeholder="Symbol (e.g., AAPL)" onChange={handleChange}/>
            {submitted && errors.symbol && <span className="error">{errors.symbol}</span>}
            <label>Quantity:</label>
            <input name="quantity" type="number" placeholder="Quantity (Number of shares to trade, e.g., 10)" onChange={handleChange}/>
            {submitted && errors.quantity && <span className="error">{errors.quantity}</span>}
            <label>Bar Size Setting:</label>
            <input name="barSizeSetting" type="text" placeholder="Bar Size (Time interval for bars, e.g., 5 mins)" onChange={handleChange}/>
            {submitted && errors.barSizeSetting && <span className="error">{errors.barSizeSetting}</span>}
            <label>Conversion Line Period (Tenkan-sen):</label>
            <input name="conversionLinePeriod" type="number" placeholder="Period (e.g., 9)" onChange={handleChange}/>
            {submitted && errors.conversionLinePeriod && <span className="error">{errors.conversionLinePeriod}</span>}
            <label>Base Line Period (Kijun-sen):</label>
            <input name="baseLinePeriod" type="number" placeholder="Period (e.g., 26)" onChange={handleChange}/>
            {submitted && errors.baseLinePeriod && <span className="error">{errors.baseLinePeriod}</span>}
            <label>Lagging Span Period (Chikou Span):</label>
            <input name="laggingSpanPeriod" type="number" placeholder="Period (e.g., 26)" onChange={handleChange}/>
            {submitted && errors.laggingSpanPeriod && <span className="error">{errors.laggingSpanPeriod}</span>}
            <label>Displacement:</label>
            <input name="displacement" type="number" placeholder="Displacement (e.g., 26)" onChange={handleChange}/>
            {submitted && errors.displacement && <span className="error">{errors.displacement}</span>}
          </>
        );
      default:
        return null;
    }
  };

  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal" ref={modalRef}>
        <h2>Enter Parameters for {indicatorType.toUpperCase()}</h2>
        <form onSubmit={handleSubmit}>
          {getFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CustomInputModal;
