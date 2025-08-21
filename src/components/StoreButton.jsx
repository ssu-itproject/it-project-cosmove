import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const StoreButton = ({ children = "상점", ...props }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/store");
  };

  return (
    <Button
      variant="store"
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default StoreButton;