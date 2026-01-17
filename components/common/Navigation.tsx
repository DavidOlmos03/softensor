'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/router';
import Button from './Button';

const Navigation: React.FC = () => {
  const { t } = useTranslation('common');
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { key: 'home', id: 'hero' },
    { key: 'services', id: 'services' },
    { key: 'team', id: 'team' },
    { key: 'contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-sunset-deep/70 backdrop-blur-md border-b-2 border-gray-200/60 dark:border-sunset-light/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-neon-gradient text-neon-contrast cursor-pointer" onClick={() => scrollToSection('hero')}>
              Softensor
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-neon-purple dark:hover:text-neon-cyan transition-colors"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>

          {/* Theme & Language Toggles */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-gray-200 dark:bg-sunset-medium hover:bg-gray-300 dark:hover:bg-sunset-light transition-colors text-xl"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Language Toggle */}
            <div className="flex space-x-2">
              <button
                onClick={() => changeLanguage('es')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  router.locale === 'es'
                    ? 'bg-neon-purple text-white shadow-neon-purple'
                    : 'bg-gray-200 dark:bg-sunset-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-sunset-light'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  router.locale === 'en'
                    ? 'bg-neon-purple text-white shadow-neon-purple'
                    : 'bg-gray-200 dark:bg-sunset-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-sunset-light'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-lg bg-gray-200 dark:bg-sunset-medium hover:bg-gray-300 dark:hover:bg-sunset-light transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 space-y-3">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-5 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-sunset-medium rounded-lg transition-colors"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
            <div className="flex items-center justify-between px-5 pt-5 border-t-2 border-gray-200 dark:border-sunset-light mt-4">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg bg-gray-200 dark:bg-sunset-medium hover:bg-gray-300 dark:hover:bg-sunset-light transition-colors text-xl"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => changeLanguage('es')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    router.locale === 'es'
                      ? 'bg-neon-purple text-white'
                      : 'bg-gray-200 dark:bg-sunset-medium text-gray-700 dark:text-gray-300'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    router.locale === 'en'
                      ? 'bg-neon-purple text-white'
                      : 'bg-gray-200 dark:bg-sunset-medium text-gray-700 dark:text-gray-300'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
