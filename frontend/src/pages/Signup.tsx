import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';//redirecting user

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    discipline: ''
  });
  const navigate = useNavigate()//initialise navigate
  
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; role?: string; discipline?: string }>({});

  const roles = ['Talent', 'Coach', 'Scout'];
  const disciplines = ['Football', 'Basketball', 'Art'];

  const validateForm = () => {
    ;
    const newErrors: { email?: string; password?: string; confirmPassword?: string; role?: string; discipline?: string } = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.discipline) {
      newErrors.discipline = 'Please select a discipline';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    if (validateForm()) {
      //check if email contains specific string
      if(formData.email.includes("Admin@triple-s.com")){
        navigate("/admin-landing-page")
        return
      }
      const { role, confirmPassword, ...userData } = formData; // Exclude confirmPassword
      //console.log('formData:',formData);
      // Define API endpoint dynamically based on role
      let apiUrl = "http://www.localhost:3000"; // Ensure this is correctly formatted
      if (role === "Talent") {
        apiUrl += "/auth/talentRegister";
      } else if (role === "Coach") {
        apiUrl += "/auth/coachRegister";
      } else if (role === "Scout") {
        apiUrl += "/auth/scoutRegister";
      } else {
        console.error("Invalid role selected");
        return;
      }

     console.log('userData that is being posted: ',userData);
  
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData) // `confirmPassword` is not included
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        navigate('/login'); // Redirect to login page
        console.log("Registration successful:", result);
        alert("Registration successful!");

        
  
        // Optionally, reset the form after successful submission
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          discipline: ""
        });
      } catch (error) {
        console.error("Registration failed:");
        alert("Registration failed. Please try again.");
        
      }
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Create your account</h3>
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
            />
            {errors.password && (
              <div className="invalid-feedback d-flex align-items-center">
                <AlertCircle className="me-1" size={16} />
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback d-flex align-items-center">
                <AlertCircle className="me-1" size={16} />
                {errors.confirmPassword}
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
            >
              <option value="">Select a role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Discipline Selection */}
          <div className="mb-3">
            <label htmlFor="discipline" className="form-label">Discipline</label>
            <select
              name="discipline"
              id="discipline"
              className={`form-select ${errors.discipline ? 'is-invalid' : ''}`}
              value={formData.discipline}
              onChange={handleChange}
            >
              <option value="">Select a discipline</option>
              {disciplines.map(discipline => (
                <option key={discipline} value={discipline}>{discipline}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "#001f3f" }}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
