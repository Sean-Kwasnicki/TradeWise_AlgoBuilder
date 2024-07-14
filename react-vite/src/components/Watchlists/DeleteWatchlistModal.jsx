import { useDispatch } from "react-redux";
import { deleteWatchlistThunk } from "../../redux/watchlist";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";

function DeleteWatchlistModal({ watchlistId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        dispatch(deleteWatchlistThunk(watchlistId));
        closeModal();
    };

    return (
        <div className="delete-portfolio-modal">
            <h1>Delete Watchlist</h1>
            <p>Are you sure you want to delete this watchlist?</p>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
            <button className="cancel-button" onClick={closeModal}>Cancel</button>
        </div>
    );
}

export default DeleteWatchlistModal;
