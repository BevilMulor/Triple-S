import React from 'react';

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ value, onValueChange, children, className }) => {
  return (
    <div className={className}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<RadioGroupItemProps>, {
            checked: (child.props as RadioGroupItemProps).value === value,
            onChange: () => onValueChange((child.props as RadioGroupItemProps).value)
          });
        }
        return child;
      })}
    </div>
  );
};

interface RadioGroupItemProps {
  value: string;
  id: string;
  checked?: boolean;
  onChange?: () => void;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ value, id, checked, onChange }) => {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className="radio-item-class"
    />
  );
};
