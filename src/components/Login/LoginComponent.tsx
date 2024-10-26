import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";
const apiUrl = import.meta.env.VITE_API_URL;

import './Login.module.scss';

const LoginComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState({message: ""});
  const { setAuthTokens, setLoading, setUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    if (!username || !password) {
      return;
    }
    e.preventDefault();
    console.log("lfnlarnblkearnblkearn"+apiUrl);
    axios.post(apiUrl + "/api/auth/signin", {
      username, password
    })
      .then((response) => {
        setAuthTokens(response.data);
        localStorage.setItem("authTokens", JSON.stringify({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }));
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(jwtDecode(response.data.accessToken));
        setLoading(true);
        setError({message: ""});
        navigate("/");
      })
      .catch((error) => {
        setError(error?.response?.data);
      }
      )
  }


  return (
    <div className="login-component">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" value= {username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>Log In</button>

        <div className="error-container">
          <span className="error">{error.message}</span>
        </div>

        <div className="footer">
          <div className="footer-row">Not a valid user!</div>
          <div className="footer-row"><Link to="/signup" className="signup-link">Register</Link></div>
        </div>
      </form>
    </div>
  )
};

export default LoginComponent;
