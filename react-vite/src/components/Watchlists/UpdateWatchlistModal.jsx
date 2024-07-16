import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWatchlistThunk } from "../../redux/watchlist";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";

function UpdateWatchlistModal({ watchlistId, currentName }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(currentName);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const watchlists = useSelector((state) => state.watchlist.watchlists)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = name.trim();
        if (watchlists.some((watchlist) => watchlist.name === trimmedName && watchlist.id !== watchlistId)) {
            setErrors({ name: "Watchlist name already exists. Please choose a different name." });
            return;
        }
        if (trimmedName.length === 0 || !/^[\w\s]+$/.test(name)) {
            setErrors({ name: "Watchlist name cannot be empty or only spaces." });
            return;
        }

        const serverResponse = await dispatch(updateWatchlistThunk(watchlistId, { name }));

        if (serverResponse) {
            closeModal();
        }
    };

    return (
        <div className="login-form">
            <h1>Update Watchlist</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Watchlist Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {errors.name && <p className="error">{errors.name}</p>}
                <button className="login-form-button" type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateWatchlistModal;
