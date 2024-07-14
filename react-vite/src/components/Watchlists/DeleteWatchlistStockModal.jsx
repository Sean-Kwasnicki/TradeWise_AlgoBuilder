import { useDispatch } from "react-redux";
import { deleteWatchlistStockThunk, getWatchlistStocksThunk } from "../../redux/watchlist";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";

function DeleteWatchlistStockModal({ watchlistId, stockId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        dispatch(deleteWatchlistStockThunk(watchlistId, stockId));
        dispatch(getWatchlistStocksThunk(watchlistId)); 
        closeModal();
    };

    return (
        <div className="delete-portfolio-modal">
            <h1>Delete Stock</h1>
            <p>Are you sure you want to delete this stock?</p>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
            <button className="cancel-button" onClick={closeModal}>Cancel</button>
        </div>
    );
}

export default DeleteWatchlistStockModal;
