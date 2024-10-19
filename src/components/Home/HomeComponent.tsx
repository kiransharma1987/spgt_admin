import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

interface userinfoInterface {
  id: number;
  username: string;
  email: string;
}

const HomeComponent = () => {
  const { authTokens, setLoading } = useContext(AuthContext);
  const { callLogout } = useContext(AuthContext);


  useEffect(() => {
    axios.get<userinfoInterface>(apiUrl + "/api/test/user", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": String(authTokens.accessToken)
      },
    })
      .then((response) => {
        if (response) {
          const data = JSON.parse(localStorage.getItem("user") || "");
          setUserInfos(data);
        }
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [userInfos, setUserInfos] = useState<userinfoInterface>();
  return (
    <div className="home-component">
      <p>Email: <span>{userInfos?.email}</span></p>
      <p>Username: <span>{userInfos?.username}</span></p>

      <p>Username: <span>{userInfos?.username}</span></p>
      <button onClick={callLogout}>Log out</button>
    </div>
  );
};

export default HomeComponent;
