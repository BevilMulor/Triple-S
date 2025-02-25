import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Talents from './pages/Talents';
import Coaches from './pages/Coaches';
import Scouts from './pages/Scouts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Success from './pages/Success';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/talents" element={<Talents userEmail="user@example.com" discipline="Football" />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/scouts" element={<Scouts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/success" element={<Success />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  );
};

export default App;
