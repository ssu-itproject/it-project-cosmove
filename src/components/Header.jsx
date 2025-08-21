import React from 'react';
import './Header.css';

function Header({ children, className = '' }) {
  return (
    <div className={`header ${className}`}>
      {children}
    </div>
  );
}

export default Header;