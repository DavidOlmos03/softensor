import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { Particles } from '@/components/ui/particles';
import '@/styles/globals.css';

function AppShell({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative flex w-full min-h-screen flex-col items-center justify-center bg-white dark:bg-black px-4">
      <Particles
        color={isDark ? '#ffffff' : '#94a3b8'}
        backgroundColor={isDark ? '#000000' : '#ffffff'}
        particleCount={25000}
        particleSize={5}
        animate={false}
        className="z-0"
      />
      <div className="relative z-10 w-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AppShell Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
