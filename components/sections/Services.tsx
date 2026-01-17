import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../common/Section';
import SectionTitle from '../common/SectionTitle';
import Carousel from '../common/Carousel';
import ExpandableCards from '@/components/ui/expandable-cards';
import { SpotlightCard } from '@/components/ui/spotlightcard';

const Services: React.FC = () => {
  const { t } = useTranslation('common');

  const services = [
    {
      key: 'fullstack',
      icon: (
        '💻'
      ),
      textClass: 'text-neon-purple',
    },
    {
      key: 'cloud',
      icon: (
        '☁️'
      ),
      textClass: 'text-neon-blue',
    },
    {
      key: 'ai',
      icon: (
        '🤖'
      ),
      textClass: 'text-neon-pink',
    },
    {
      key: 'data',
      icon: (
        '📊'
      ),
      textClass: 'text-neon-cyan',
    },
  ];

  const renderServiceCard = (service: typeof services[number]) => (
    <SpotlightCard
      className="keep-light-text h-full bg-sunset-dark/70 border border-neon-purple/60 text-white"
      spotlightColor="6, 255, 240"
    >
      <div className="text-center space-y-4 py-4">
        <div className="text-5xl md:text-6xl lg:text-7xl mb-6">{service.icon}</div>
        <h3 className={`text-xl md:text-2xl font-bold ${service.textClass} mb-3`}>
          {t(`services.${service.key}.title`)}
        </h3>
        <p className="text-sm md:text-base text-gray-300 leading-relaxed px-2">
          {t(`services.${service.key}.description`)}
        </p>
      </div>
    </SpotlightCard>
  );

  return (
    <Section id="services" background="dark">
      <SectionTitle
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      />

      <div className="md:hidden">
        <Carousel
          options={{ align: 'start', loop: true, dragFree: true }}
          slideClassName="md:flex-[0_0_48%] lg:flex-[0_0_24%]"
        >
          {services.map((service) => (
            <div key={service.key} className="h-full">
              {renderServiceCard(service)}
            </div>
          ))}
        </Carousel>
      </div>

      <div className="hidden md:block h-[320px] md:h-[360px] w-full select-none">
        <ExpandableCards
          cards={services.map((service, index) => ({
            id: index + 1,
            content: renderServiceCard(service),
          }))}
          defaultExpanded={2}
        />
      </div>

      {/* Technologies Section */}
      <div className="mt-20 md:mt-24 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-neon-cyan mb-10 md:mb-12 px-4">
          Stack Tecnológico / Tech Stack
        </h3>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-4">
          {[
            'React', 'Next.js', 'TypeScript', 'Python', 'Java',
            'AWS', 'Azure', 'GCP', 'TensorFlow', 'PyTorch',
            'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes'
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 md:px-5 py-2 md:py-3 bg-sunset-medium/70 border border-neon-purple rounded-full text-sm md:text-base text-gray-300 hover:border-neon-cyan hover:text-neon-cyan transition-all"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Services;
