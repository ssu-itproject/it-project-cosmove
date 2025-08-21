import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'default',
  size = 'medium',
  disabled = false,
  icon = null,
  className = '',
  ...props 
}) => {
  const baseClasses = 'btn-base transition-normal';
  const variantClasses = {
    default: 'bg-primary text-white hover:bg-primary',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    back: 'bg-secondary text-white hover:bg-secondary',
    store: 'bg-success text-white hover:bg-success',
    add: 'bg-warning text-gray-900 hover:bg-warning',
    danger: 'bg-danger text-white hover:bg-danger'
  };
  
  const sizeClasses = {
    small: 'p-xs text-sm',
    medium: 'p-sm text-base',
    large: 'p-md text-lg'
  };
  
  const buttonClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.medium,
    className
  ].filter(Boolean).join(' ');
  
  const buttonStyle = {
    backgroundColor: variant === 'default' ? 'var(--color-primary)' : 
                     variant === 'secondary' ? 'var(--color-gray-100)' :
                     variant === 'back' ? 'var(--color-secondary)' :
                     variant === 'store' ? 'var(--color-success)' :
                     variant === 'add' ? 'var(--color-warning)' :
                     variant === 'danger' ? 'var(--color-danger)' : undefined,
    color: variant === 'default' ? 'white' :
           variant === 'secondary' ? 'var(--color-gray-800)' :
           variant === 'back' ? 'white' :
           variant === 'store' ? 'white' :
           variant === 'add' ? 'var(--color-gray-900)' :
           variant === 'danger' ? 'white' : undefined,
    padding: size === 'small' ? '6px 12px' : size === 'large' ? '14px 28px' : '10px 20px',
    fontSize: size === 'small' ? 'var(--font-size-sm)' : size === 'large' ? 'var(--font-size-lg)' : 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-medium)'
  };
  
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
      {...props}
    >
      {icon && <span className="inline-flex items-center">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;