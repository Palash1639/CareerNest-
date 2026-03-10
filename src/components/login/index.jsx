import './index.css';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State to store login form values
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    errorMsg: ""
  });

  const navigate = useNavigate();
  const token = Cookies.get("myToken");

  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (token !== undefined) {
      navigate("/");
    }
  }, [token, navigate]);

  const onSubmitUserDetails = async (e) => {
    e.preventDefault();

    const apiUrl = "https://apis.ccbp.in/login";

    const userDetails = {
      username: formData.username,
      password: formData.password
    };

    const options = {
      method: "POST",
      body: JSON.stringify(userDetails)
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok) {
        // If login successful, clear error and set token
        setFormData({ ...formData, errorMsg: "" });
        Cookies.set("myToken", data.jwt_token, { expires: 30 }); // Token expires in 30 days
        navigate("/");
      } else {
        // Show error message if login fails
        setFormData({ ...formData, errorMsg: data.error_msg });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setFormData({ ...formData, errorMsg: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="login-container">
      <h1 className="text-center mb-4">Job Search</h1>
      <form className="w-50 p-4 border border-info rounded shadow" onSubmit={onSubmitUserDetails}>
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            value={formData.username}
            required
          />
          <small className="form-text text-muted">Hint: Use 'rahul' / 'rahul@2021'</small>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            value={formData.password}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>

        {formData.errorMsg && <p className="text-danger mt-3 text-center">{formData.errorMsg}</p>}
      </form>
    </div>
  );
};

export default Login;