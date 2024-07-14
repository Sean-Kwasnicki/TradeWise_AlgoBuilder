import { useDispatch } from "react-redux";
import { deletePortfolioStockThunk, getPortfolioStocksThunk } from "../../redux/portfolio";
import { useModal } from "../../context/Modal";


function DeleteStockModal({ portfolioId, stockId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(deletePortfolioStockThunk(portfolioId, stockId));
        dispatch(getPortfolioStocksThunk(portfolioId));
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

export default DeleteStockModal;
