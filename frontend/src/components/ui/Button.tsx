import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className = "", type = 'button' }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};