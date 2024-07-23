import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortfolioThunk } from "../../redux/portfolio";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";
import { FaSpinner } from 'react-icons/fa';

function PortfolioFormModal() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const { closeModal } = useModal();
    const portfolios = useSelector((state) => state.portfolio.portfolios);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = name.trim();
        if (portfolios.some((portfolio) => portfolio.name === trimmedName)) {
            setErrors({ name: "Portfolio name already exists. Please choose a different name." });
            return;
        }
        if (trimmedName.length === 0 || !/^[\w\s]+$/.test(name)) {
            setErrors({ name: "Portfolio name cannot be empty or only spaces." });
            return;
        }

        setSubmitting(true);

        const serverResponse = await dispatch(createPortfolioThunk({ name: trimmedName }));

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
                    <p>Creating portfolio...</p>
                </div>
            ) : (
                <>
                    <h1>Create Portfolio</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Portfolio Name
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

export default PortfolioFormModal;
