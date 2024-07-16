import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWatchlistStockThunk } from "../../redux/watchlist";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";

function AddToWatchlistModal({ symbol, currentPrice }) {
    const dispatch = useDispatch();
    const watchlists = useSelector((state) => state.watchlist.watchlists);
    const [watchlistId, setWatchlistId] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if(!watchlistId) {
            newErrors.watchlistId = "Please select a watchlist."
        }

        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const serverResponse = await dispatch(
            addWatchlistStockThunk(watchlistId, {
                stock_symbol: symbol,
                current_price: currentPrice,
            })
        );

        if (serverResponse) {
            closeModal();
        }
    };

    return (
        <div className="login-form">
            <h1>Add to Watchlist</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Watchlist
                    <select
                        value={watchlistId}
                        onChange={(e) => setWatchlistId(e.target.value)}
                        required
                    >
                        <option value="">Select Watchlist</option>
                        {watchlists.map((watchlist) => (
                            <option key={watchlist.id} value={watchlist.id}>
                                {watchlist.name}
                            </option>
                        ))}
                    </select>
                </label>
                {errors.watchlistId && <p className="error">{errors.watchlistId}</p>}
                <button className="login-form-button" type="submit">Add to Watchlist</button>
            </form>
        </div>
    );
}

export default AddToWatchlistModal;
