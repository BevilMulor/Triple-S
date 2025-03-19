
import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../auth/realAuthContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';//redirecting user

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string; role?: string }>({});
  const [loading, setLoading] = useState(false);

  const roles = ['Talent', 'Coach', 'Scout'];

  const navigate = useNavigate()//initialise navigate


  const validateForm = () => {
    const newErrors: { email?: string; password?: string; role?: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const { login } = useAuth();//implementing session store/ realauthcontext
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true); // Start loading state

      const { email, password, role } = formData;

      let apiUrl = "http://www.localhost:3000"; // Ensure this is correctly formatted
      if (role === "Talent") {
        apiUrl += "/auth/talentLogin";
      } else if (role === "Coach") {
        apiUrl += "/auth/coachLogin";
      } else if (role === "Scout") {
        apiUrl += "/auth/scoutLogin";
      } else {
        console.error("Invalid role selected");
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
     
        console.log('Login successful:', result);
       

        login(result.token, result.user); // Call login function to set the user session

        // Save JWT token to localStorage or sessionStorage
        //localStorage.setItem('authToken', result.token); // Adjust according to your API response
        console.log('user: ',result.user.role)
        //localStorage.setItem('userRole', result.user.role);

        if (role === "Talent") {
          console.log('logging in as a talent')
          return navigate('/talents');
        } else if (role === "Coach") {
          navigate('/actual-coach-profile');
        } else if (role === "Scout" && result.user.dashboard.length > 0) {
          navigate('/actual-scout-profile');
        } else if (role === "Scout" && result.user.dashboard.length <= 0) {
          navigate('/scouts');
        } 
        
         else {
          console.error("Invalid role selected");
          return;
        }
        // Optionally, redirect or perform further actions after login

      } catch (error) {
        console.error('Login failed:');
        alert('Login failed. Please try again.');
      } finally {
        setLoading(false); // End loading state
      }
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoToHome=()=>{
    navigate('/')
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <button onClick = {handleGoToHome}
       
       className="position-absolute top-0 end-10 m-3">
        <i className="bi bi-arrow-left me-1"></i>
        Back to Home
      </button>
      <div className="card p-4 shadow-lg" style={{ width: '350px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit} className="needs-validation">
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className="invalid-feedback d-flex align-items-center">
                <AlertCircle className="me-1" size={16} />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <div className="invalid-feedback d-flex align-items-center">
                <AlertCircle className="me-1" size={16} />
                {errors.password}
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              name="role"
              id="role"
              className={`form-select ${errors.role ? 'is-invalid' : ''}`}
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select a role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {errors.role && (
              <div className="invalid-feedback d-flex align-items-center">
                <AlertCircle className="me-1" size={16} />
                {errors.role}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: '#001f3f' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        
        </form>
        
      </div>
    </div>
  );
};

export default Login;