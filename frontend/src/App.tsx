import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminSignup from "./components/AdminSignup";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
        </Routes>
      </Router>
  );
};

export default App;
