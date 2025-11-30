import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'neon' | 'gradient';
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  hover = true,
}) => {
  const baseStyles = 'rounded-xl p-6 md:p-8 transition-all duration-300';

  const variantStyles = {
    default: 'bg-white dark:bg-sunset-medium border border-gray-200 dark:border-sunset-light',
    neon: 'bg-sunset-dark border-2 border-neon-cyan shadow-neon-cyan',
    gradient: 'bg-gradient-to-br from-sunset-medium to-sunset-dark border border-neon-purple',
  };

  const hoverStyles = hover
    ? 'hover:scale-105 hover:shadow-2xl cursor-pointer'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
