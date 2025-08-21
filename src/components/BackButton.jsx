import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const BackButton = ({ to = -1, children = "← 뒤로가기", ...props }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof to === 'number') {
      navigate(to);
    } else {
      navigate(to);
    }
  };

  return (
    <Button
      variant="back"
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default BackButton;