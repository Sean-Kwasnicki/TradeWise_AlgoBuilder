import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { createPortfolioThunk } from "../../redux/portfolio";


function PortfolioFormPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});

    if (sessionUser) return <Navigate to="/" replace={true} />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(createPortfolioThunk({ name }));

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            navigate("/");
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
                {errors.name && <p className="error">{errors.name}</p>}
                <button className="portfolio-form-button" type="submit">Create</button>
            </form>
        </div>
    );
}

export default PortfolioFormPage;
