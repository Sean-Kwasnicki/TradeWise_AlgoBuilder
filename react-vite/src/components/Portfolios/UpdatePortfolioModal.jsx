import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePortfolioThunk } from "../../redux/portfolio";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css"

function UpdatePortfolioModal({ portfolioId, currentName }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(currentName);

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(updatePortfolioThunk(portfolioId, { name }));

        if (serverResponse) {
            closeModal();
        }
    };

    return (
        <div className="portfolio-form">
            <h1>Update Portfolio</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Portfolio Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button className="portfolio-form-button" type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdatePortfolioModal;
