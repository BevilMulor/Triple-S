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
import ScoutForm from './pages/scoutForm';
import OpenTalentProfile from './pages/OpenTalentProfile';


//auth
//import { useAuth } from './auth/realAuthContext';
import RealPrivateRoute from './auth/RealPrivateRoute';
import ErrorBoundary from './auth/errorBoundary';

import { RealAuthProvider } from './auth/realAuthContext';
import ScoutProfile from './pages/scoutProfile';
import CoachForm from './pages/coachForm';
import CoachProfile from './pages/coachProfile';
import AdminSignUpPage from './pages/AdminSignUp';
import AdminLandingPage from './pages/AdminLandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminProfile from './pages/AdminProfile';
import AdminDashboard from './pages/AdminDashboard';
import AdminForm from './pages/AdminForm';


const App: React.FC = () => {
  //In React, React.FC (or React.FunctionComponent) is a TypeScript type used to define functional components
  //const { isLoggedIn } = useAuth();

  return (
    <RealAuthProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/talents" element={
              <RealPrivateRoute allowedRoles={['Talent']}>
                <Talents />
              </RealPrivateRoute>
            } />
            <Route path="/coach-profile" element={
              <RealPrivateRoute allowedRoles={['Coach']}>
                <Coaches />
              </RealPrivateRoute>
            } />
            <Route path="/scout-profile" element={
              <RealPrivateRoute allowedRoles={['Scout']}>
                <Scouts />
              </RealPrivateRoute>
            } />
            <Route path="/talent-profile/:id" element={
              <RealPrivateRoute allowedRoles={['Coach','Scout']}>
                <OpenTalentProfile/>
              </RealPrivateRoute>
            } />
              <Route path="/talent-profile" element={
              <RealPrivateRoute allowedRoles={['Talent']}>
                <TalentProfile />
              </RealPrivateRoute>
            } />
            <Route path="/scouts" element={
              <RealPrivateRoute allowedRoles={['Scout']}>
                <ScoutForm/>
              </RealPrivateRoute>
            } />
            <Route path="/actual-scout-profile" element={
              <RealPrivateRoute allowedRoles={['Scout']}>
                <ScoutProfile/>
              </RealPrivateRoute>
            } />
            <Route path="/actual-coach-profile" element={
              <RealPrivateRoute allowedRoles={['Coach']}>
                <CoachProfile/>
              </RealPrivateRoute>
            } />
            <Route path="/coaches" element={
              <RealPrivateRoute allowedRoles={['Coach']}>
                <CoachForm/>
              </RealPrivateRoute>
            } /> 
            <Route path="/admin-profile" element={
              <RealPrivateRoute allowedRoles={['Admin']}>
                <AdminProfile/>
              </RealPrivateRoute>
            } /> 
             <Route path="/admin-dashboard" element={
              <RealPrivateRoute allowedRoles={['Admin']}>
                <AdminDashboard/>
              </RealPrivateRoute>
            } /> 
            <Route path="/admin-form" element={
              <RealPrivateRoute allowedRoles={['Admin']}>
                <AdminForm/>
              </RealPrivateRoute>
            } /> 



            <Route path="/admin-login" element={<AdminLogin/>}/>
            <Route path="/admin-landing-page" element={<AdminLandingPage/>}/>
            <Route path="/admin-register" element={<AdminSignUpPage/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/success" element={<Success />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/coach-profile/:id" element={<CoachProfile />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </RealAuthProvider>
  );
};

export default App;