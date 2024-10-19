import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const SignupComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState({message: ""});
  let navigate = useNavigate();


  useEffect(() => {
    document.querySelector('.cont')?.classList?.toggle('s-signup');
  }, []);


  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError({message: "All the fields are manditory!"});
      return;
    }
    if (password != confirmPassword) {
      setError({message: "Password and Confirm password should match!"});
      return;
    }
    console.log("jing chak");
    axios.post(apiUrl + "/api/auth/signup", {
      username,
      email,
      password,
    })
      .then((response) => {
        console.log(response.data);
        navigate("/login")
      })
      .catch((error) => {
        setError(error?.response?.data);
      })
  }

  const signinClick = () => {
    navigate("/login");
  }

  return (
    <div className="cont">
      <div className="sub-cont">
        <div className="img">
          <div className="img-text m-in">
            <h1>One of us?</h1>
            <p>just sign in</p>
          </div>
          <div className="img-btn">
            <span className="m-in" onClick={signinClick}>Sign In</span>
          </div>
        </div>
        <div className="form sign-up">
          <h2>Sign Up</h2>
          <label>
            <span>Username</span>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            <span>Confirm Password</span>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          <label className="error-container">
            <span className="error">{error.message}</span>
          </label>
          <button type="button" className="submit" onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default SignupComponent;
