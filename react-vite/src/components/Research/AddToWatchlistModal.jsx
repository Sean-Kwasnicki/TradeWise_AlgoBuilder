import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWatchlistStockThunk, getWatchlistStocksThunk, getAllWatchlistsThunk } from "../../redux/watchlist";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";

function AddToWatchlistModal({ symbol, currentPrice }) {
    const dispatch = useDispatch();
    const watchlists = useSelector((state) => state.watchlist.watchlists);
    const stocksByWatchlistId = useSelector((state) => state.watchlist.stocksByWatchlistId);
    const [watchlistId, setWatchlistId] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getAllWatchlistsThunk());
    }, [dispatch]);


    useEffect(() => {
        if (watchlistId) {
            dispatch(getWatchlistStocksThunk(watchlistId));
        }
    }, [dispatch, watchlistId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!watchlistId) {
            newErrors.watchlistId = "Please select a watchlist.";
        } else if (stocksByWatchlistId[watchlistId]?.some(stock => stock.stock_symbol === symbol)) {
            newErrors.watchlistId = "Stock is already in watchlist.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const serverResponse = dispatch(
            addWatchlistStockThunk(watchlistId, {
                stock_symbol: symbol,
                current_price: currentPrice,
            })
        );

        if (!serverResponse.errors) {
            closeModal();
        } else {
            setErrors(serverResponse.errors);
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
