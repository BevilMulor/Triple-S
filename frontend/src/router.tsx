import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
// import Talents from "./pages/Talents";
// import Scouts from "./pages/Scouts";
// import Coaches from "./pages/Coaches";
// import AdminPanel from "./pages/AdminPanel";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/talents" element={<Talents />} />
        <Route path="/scouts" element={<Scouts />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
