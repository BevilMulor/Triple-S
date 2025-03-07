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
import TalentProfile from './pages/TalentProfile';

//auth
//import { useAuth } from './auth/realAuthContext';
import RealPrivateRoute from './auth/RealPrivateRoute';
import ErrorBoundary from './auth/errorBoundary';
 import { RealAuthProvider } from './auth/realAuthContext';



const App: React.FC = () => {
  //In React, React.FC (or React.FunctionComponent) is a TypeScript type used to define functional components
  //const { isLoggedIn } = useAuth();

  return (
    <RealAuthProvider>
    <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />


        {/* Protect routes based on role */}
        <Route
          path="/coaches"
          element={
            <RealPrivateRoute allowedRoles={['Coach']}>
              <Coaches />
            </RealPrivateRoute>
          }
        />
        <Route
          path="/talents"
          element={
            <RealPrivateRoute allowedRoles={['Talent']}>
              <Talents userEmail="user@example.com" discipline="Football" />
            </RealPrivateRoute>
          }
        />
        <Route
          path="/talent-profile"
          element={
            <RealPrivateRoute allowedRoles={['Scout','Talent','Coach']}>
              <TalentProfile/>
            </RealPrivateRoute>
          }
        />
        <Route
          path="/scouts"
          element={
            <RealPrivateRoute allowedRoles={['Scout']}>
              <Scouts />
            </RealPrivateRoute>
          }
        />
        
        {/* <Route path="/talents" element={<Talents userEmail="user@example.com" discipline="Football" />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/scouts" element={<Scouts />} /> */}



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
   </ErrorBoundary>
     </RealAuthProvider> 
  );
};

export default App;
