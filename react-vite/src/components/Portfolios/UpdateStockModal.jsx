import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePortfolioStockThunk, getPortfolioStocksThunk } from "../../redux/portfolio";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";

function UpdateStockModal({ portfolioId, stock }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(stock.quantity);
    const [purchasePrice, setPurchasePrice] = useState(stock.purchase_price);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!quantity || quantity <= 0) {
            newErrors.quantity = "Quantity must be a positive whole number.";
        }
        if (!purchasePrice || purchasePrice <= 0) {
            newErrors.purchase_price = "Purchase price must be a positive number and can have up to two decimal places.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const serverResponse = await dispatch(updatePortfolioStockThunk(portfolioId, stock.id, {
            quantity: parseInt(quantity),
            purchase_price: parseFloat(purchasePrice),
            current_price: stock.current_price
        }));

        if (serverResponse && serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            dispatch(getPortfolioStocksThunk(portfolioId));
            closeModal();
        }
    };

    return (
        <div className="login-form">
            <h1>Update Stock</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Quantity
                    <input
                        type="number"
                        min="1"
                        step="1"
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
                        min="0.01"
                        step="0.01"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        required
                    />
                </label>
                {errors.purchase_price && <p className="error">{errors.purchase_price}</p>}
                <button className="login-form-button" type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateStockModal;
