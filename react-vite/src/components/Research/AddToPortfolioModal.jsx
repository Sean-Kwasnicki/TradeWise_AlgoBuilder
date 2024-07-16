import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPortfolioStockThunk } from "../../redux/portfolio";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";

function AddToPortfolioModal({ symbol }) {
    const dispatch = useDispatch();
    const portfolios = useSelector((state) => state.portfolio.portfolios);
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [portfolioId, setPortfolioId] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!quantity || isNaN(quantity) || parseFloat(quantity) <= 0) {
            newErrors.quantity = "Quantity must be a positive number.";
        }

        if (!purchasePrice || isNaN(purchasePrice) || parseFloat(purchasePrice) <= 0) {
            newErrors.purchasePrice = "Purchase price must be a positive number.";
        }

        if (!portfolioId) {
            newErrors.portfolioId = "Please select a portfolio.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const serverResponse = await dispatch(
            addPortfolioStockThunk(portfolioId, {
                stock_symbol: symbol,
                quantity: parseFloat(quantity),
                purchase_price: parseFloat(purchasePrice),
            })
        );

        if (serverResponse) {
            closeModal();
        }
    };

    return (
        <div className="login-form">
            <h1>Add to Portfolio</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Quantity
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </label>
                {errors.quantity && <p className="error">{errors.quantity}</p>}
                <label>
                    Purchase Price
                    <input
                        type="number"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        required
                    />
                </label>
                {errors.purchasePrice && <p className="error">{errors.purchasePrice}</p>}
                <label>
                    Portfolio
                    <select
                        value={portfolioId}
                        onChange={(e) => setPortfolioId(e.target.value)}
                        required
                    >
                        <option value="">Select Portfolio</option>
                        {portfolios.map((portfolio) => (
                            <option key={portfolio.id} value={portfolio.id}>
                                {portfolio.name}
                            </option>
                        ))}
                    </select>
                </label>
                {errors.portfolioId && <p className="error">{errors.portfolioId}</p>}
                <button className="login-form-button" type="submit">Add to Portfolio</button>
            </form>
        </div>
    );
}

export default AddToPortfolioModal;
