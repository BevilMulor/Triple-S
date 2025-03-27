import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';//redirecting user

const AdminSignUpPage = () => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    confirmPassword: '',
   
  });
  const navigate = useNavigate()//initialise navigate
  
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; role?: string; discipline?: string }>({});

 
  const validateForm = () => {
    ;
    const newErrors: { email?: string; password?: string; confirmPassword?: string; name?: string;  } = {};
    
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

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    if (validateForm()) {
      const {  confirmPassword, ...userData } = formData; // Exclude confirmPassword
      //console.log('formData:',formData);
      // Define API endpoint dynamically based on role
      let adminRegUrl="http://www.localhost:3000/admin/register"; // Ensure this is correctly formatted
    

     console.log('userData that is being posted: ',userData);
  
      try {
        const response = await fetch(adminRegUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData) // `confirmPassword` is not included
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        navigate('/admin-login'); // Redirect to login page
        console.log("Registration successful:", result);
        alert("Registration successful!");

        
  
        // Optionally, reset the form after successful submission
        setFormData({
          name:"",
          email: "",
          password: "",
          confirmPassword: "",
          
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

  //console.log('formData: ',formData)

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Create your Administrator account</h3>
        <form onSubmit={handleSubmit} className="needs-validation">

           {/* Name Input */}
           <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback d-flex align-items-center">
                <AlertCircle className="me-1" size={16} />
                {errors.name}
              </div>
            )}
          </div>
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

export default AdminSignUpPage;
