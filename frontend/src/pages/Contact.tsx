import React, { useState } from 'react';
import {Navbar} from '../components/common/Navbar';
import {Footer} from '../components/common/Footer';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form or show success message
  };

  return (
    <div className="contact-page">
      <Navbar />
      
      {/* Contact Form Section */}
      <div className="container">
        <div className="contact-form-container bg-white rounded shadow-sm p-4 p-md-5 mx-auto my-4" style={{ maxWidth: '600px' }}>
          <h2 className="text-center mb-2">Contact Us</h2>
          <p className="text-center text-muted mb-4">Get in touch with our team for any inquiries or support</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input 
                type="text" 
                className="form-control" 
                id="subject" 
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea 
                className="form-control" 
                id="message" 
                rows={4} 
                placeholder="Tell us more about your inquiry..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div className="text-center">
              <button 
                type="submit" 
                className="btn btn-primary px-4 py-2" 
                style={{ width: '50%' }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
