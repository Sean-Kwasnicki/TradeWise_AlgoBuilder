import { useDispatch } from "react-redux";
import { deletePortfolioThunk } from "../../redux/portfolio";
import { useModal } from "../../context/Modal";
import "./DeletePortfolioModal.css"


function DeletePortfolioModal({ portfolioId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(deletePortfolioThunk(portfolioId));
        closeModal();
    };

    return (
        <div className="delete-portfolio-modal">
            <h1>Delete Portfolio</h1>
            <p>Are you sure you want to delete this portfolio?</p>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
            <button className="cancel-button" onClick={closeModal}>Cancel</button>
        </div>
    );
}

export default DeletePortfolioModal;
