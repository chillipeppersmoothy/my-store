import { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../services";
import { authenticate } from "../store/loginSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const getUser = async () => {
      const response = await authenticateUser(email, password);

      const authenticated = response.find(
        (user) => user.email === email && user.password === password
      );

      if (authenticated?.email !== email) {
        setErrorMsg("Email or Password is Invalid");
        return;
      }
      dispatch(authenticate(authenticated));
      location.state?.path ? navigate(location.state.path) : navigate("/");

      setLoading(false);
      return authenticated;
    };

    await getUser().catch((e) => console.log(e));
  };

  return (
    <div>
      <form className="login-form">
        <span className="error-span">{errorMsg}</span>
        <label htmlFor="email" className="login-label">
          Email
        </label>
        <input
          type="text"
          name="email"
          className="login-inp"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="login-inp"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={handleLogin}
          disabled={loading ? true : false}
        >
          {!loading ? "Submit" : "Loading..."}
        </button>
      </form>
      <p>email: john@gmail.com & password: m38rmF$</p>
    </div>
  );
};
export default Login;
