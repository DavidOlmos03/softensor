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
    default: 'bg-white/80 dark:bg-sunset-medium/70 border border-gray-200/60 dark:border-sunset-light/70',
    neon: 'bg-sunset-dark/70 border-2 border-neon-cyan shadow-neon-cyan',
    gradient: 'bg-gradient-to-br from-sunset-medium/80 to-sunset-dark/80 border border-neon-purple',
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
