import React, { createContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

type AccessTokensType = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

interface CurrentUserContextType {
  authTokens: AccessTokensType;
  setAuthTokens: React.Dispatch<React.SetStateAction<AccessTokensType>>;
  user: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  callLogout: () => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);

const AuthProvider: React.FC<Props> = ({ children }) => {
  let [authTokens, setAuthTokens] = useState<AccessTokensType>(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") || "")
      : undefined
  );

  let [user, setUser] = useState<string | undefined>(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens") || "")
      : undefined
  );

  let [loading, setLoading] = useState<boolean>(false);


  // Updating tokens
  function updateAccess() {
    if (authTokens) {
      axios.post(apiUrl + "/api/auth/refreshtoken", {
        refreshToken: authTokens.refreshToken,
      })
        .then(function (response) {
          setAuthTokens(response.data);
          setUser(jwtDecode(response.data.accessToken));
          setLoading(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function callLogout() {
    setAuthTokens({ accessToken: undefined, refreshToken: undefined });
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    setUser(undefined);
  }

  // updating the refresh token after revisiting and accessing the token expiration time
  useEffect(() => {
    if (!loading) {
      updateAccess();
    }

    if (!authTokens) {
      setLoading(true);
    }

    let twentyMinutes = 1000 * 60 * 20;

    let interval = setInterval(() => {
      if (authTokens) {
        updateAccess();
      }
    }, twentyMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={{ setAuthTokens, authTokens, setLoading, loading, callLogout, user, setUser, }}>
      {loading ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthProvider;