import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPortfolioThunk } from "../../redux/portfolio";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css"

function PortfolioFormModal() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(createPortfolioThunk({ name }));

        if (serverResponse) {
            closeModal();
        }
    };

    return (
        <div className="portfolio-form">
            <h1>Create Portfolio</h1>
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
                {/* {errors.name && <p className="error">{errors.name}</p>} */}
                <button className="portfolio-form-button" type="submit">Create</button>
            </form>
        </div>
    );
}

export default PortfolioFormModal;
