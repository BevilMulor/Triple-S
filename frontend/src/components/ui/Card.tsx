import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="card-header">
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h2 className="card-title">
      {children}
    </h2>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="card-content">
      {children}
    </div>
  );
};