import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWatchlistThunk } from "../../redux/watchlist";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";
import { FaSpinner } from 'react-icons/fa';

function WatchlistModal() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const { closeModal } = useModal();
    const watchlists = useSelector((state) => state.watchlist.watchlists);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = name.trim();
        if (watchlists.some((watchlist) => watchlist.name === trimmedName)) {
            setErrors({ name: "Watchlist name already exists. Please choose a different name." });
            return;
        }
        if (trimmedName.length === 0 || !/^[\w\s]+$/.test(name)) {
            setErrors({ name: "Watchlist name cannot be empty or only spaces." });
            return;
        }

        setSubmitting(true);

        const serverResponse = await dispatch(createWatchlistThunk({ name: trimmedName }));

        if (serverResponse) {
            closeModal();
        } else {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-form">
            {submitting ? (
                <div className="loading-container">
                    <FaSpinner className="spinner" />
                    <p>Creating watchlist...</p>
                </div>
            ) : (
                <>
                    <h1>Create Watchlist</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Watchlist Name
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={submitting}
                            />
                        </label>
                        {errors.name && <p className="error">{errors.name}</p>}
                        <button className="login-form-button" type="submit" disabled={submitting}>Create</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default WatchlistModal;
