import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../common/Section';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import Card from '../common/Card';

const Contact: React.FC = () => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement your contact form logic
    console.log('Form submitted:', formData);
    alert('Thank you for your message! / ¡Gracias por tu mensaje!');
    setFormData({ email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Section id="contact" background="dark">
      <SectionTitle
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <div className="max-w-3xl mx-auto px-4">
        <Card variant="gradient" hover={false}>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm md:text-base font-medium text-neon-cyan mb-3"
              >
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 md:px-5 py-3 md:py-4 bg-sunset-deep border-2 border-neon-purple rounded-lg focus:border-neon-cyan focus:outline-none text-white placeholder-gray-400 text-base"
                placeholder="your@email.com"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm md:text-base font-medium text-neon-cyan mb-3"
              >
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 md:px-5 py-3 md:py-4 bg-sunset-deep border-2 border-neon-purple rounded-lg focus:border-neon-cyan focus:outline-none text-white placeholder-gray-400 resize-none text-base"
                placeholder={t('contact.message')}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="neon"
                size="lg"
                className="w-full"
              >
                {t('contact.send')}
              </Button>
            </div>
          </form>
        </Card>

        {/* Contact Info */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="flex justify-center items-center space-x-10 md:space-x-12">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-neon-cyan transition-colors text-4xl md:text-5xl"
              aria-label="GitHub"
            >
              🔗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-neon-cyan transition-colors text-4xl md:text-5xl"
              aria-label="LinkedIn"
            >
              💼
            </a>
            <a
              href="mailto:info@softensor.com"
              className="text-gray-300 hover:text-neon-cyan transition-colors text-4xl md:text-5xl"
              aria-label="Email"
            >
              📧
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
