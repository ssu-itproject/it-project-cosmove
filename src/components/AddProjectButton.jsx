import React from 'react';
import Button from './Button';

const AddProjectButton = ({ 
  onClick, 
  children = "세부 프로젝트 추가",
  variant = "add",
  icon = null,
  ...props 
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      icon={icon}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AddProjectButton;