import React from 'react';

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ children, className }) => {
  return <div className={`accordion ${className}`}>{children}</div>;
};

interface AccordionItemProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ children, className }) => {
  return <div className={`accordion-item ${className}`}>{children}</div>;
};

interface AccordionHeaderProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children, className, onClick }) => {
  return (
    <div className={`accordion-header ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

interface AccordionPanelProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}

export const AccordionPanel: React.FC<AccordionPanelProps> = ({ children, className, isOpen }) => {
  return isOpen ? <div className={`accordion-panel ${className}`}>{children}</div> : null;
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, className, onClick }) => {
  return (
    <button className={`accordion-trigger ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
