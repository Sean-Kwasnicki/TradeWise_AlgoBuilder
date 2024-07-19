import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const validationErrors = {};

    if (!trimmedEmail) {
      validationErrors.email = "Email cannot be empty or contain only spaces.";
    }
    if (!trimmedPassword) {
      validationErrors.password = "Password cannot be empty or contain only spaces.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const serverResponse = await dispatch(
      thunkLogin({
        email: email.trim(),
        password: password.trim(),
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = async () => {
    const demoEmail = "demo@aa.io";
    const demoPassword = "password";

    const serverResponse = await dispatch(
      thunkLogin({
        email: demoEmail,
        password: demoPassword,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-form">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="login-error">{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="login-error">{errors.password}</p>}
        <button className="login-form-button" type="submit">Log In</button>
        <button className="login-form-button" onClick={handleDemoLogin}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
