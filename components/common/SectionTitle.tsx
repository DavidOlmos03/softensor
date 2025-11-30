import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  neonEffect?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  neonEffect = true,
}) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-16 md:mb-20 ${alignStyles[align]}`}>
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4 ${
          neonEffect
            ? 'text-transparent bg-clip-text bg-neon-gradient animate-glow'
            : 'text-gray-900 dark:text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
