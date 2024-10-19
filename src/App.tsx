import { Routes, Route } from "react-router-dom";
import LoginComponent from "./components/Login/LoginComponent";
import SignupComponent from "./components/Signup/SignupComponent";

import AuthProvider from "./context/AuthContext";

import RequireAuth from "./utils/RequireAuth";
import HomeComponent from "./components/Home/HomeComponent";

function App() {
    return (
      <AuthProvider>
      <div className="App">
      <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomeComponent />} />
          </Route>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
        </Routes>
      </div>
      </AuthProvider>
    )
}

export default App;
