import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateWatchlistThunk } from "../../redux/watchlist";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";

function UpdateWatchlistModal({ watchlistId, currentName }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(currentName);
    // const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(updateWatchlistThunk(watchlistId, { name }));

        if (serverResponse) {
        //     setErrors(serverResponse);
        // } else {
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
                {/* {errors.name && <p className="error">{errors.name}</p>} */}
                <button className="login-form-button" type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateWatchlistModal;
