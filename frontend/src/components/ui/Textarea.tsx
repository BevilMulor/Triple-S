import React from 'react';

interface TextareaProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ id, value, onChange, placeholder, className }) => {
  return (
    <textarea 
      id={id}
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      className={className} 
    />
  );
};

export default Textarea;