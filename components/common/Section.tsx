import React from 'react';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'gradient' | 'dark';
}

const Section: React.FC<SectionProps> = ({
  id,
  children,
  className = '',
  background = 'default',
}) => {
  const backgroundStyles = {
    default: 'bg-transparent',
    gradient: 'bg-transparent',
    dark: 'bg-transparent',
  };

  return (
    <section
      id={id}
      className={`py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 ${backgroundStyles[background]} ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
};

export default Section;
