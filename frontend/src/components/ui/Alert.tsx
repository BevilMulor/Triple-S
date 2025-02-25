import React from 'react';

interface AlertProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'default', children }) => {
  const variantClass = variant === 'destructive' ? 'alert-destructive' : 'alert-default';
  return (
    <div className={`alert ${variantClass}`}>
      {children}
    </div>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => {
  return (
    <div className="alert-description">
      {children}
    </div>
  );
};