import { theme } from '../styles/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Open_Sans, Montserrat } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import { GlobalStyles } from '../styles/global-styles';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <div className={`${openSans.className} ${montserrat.className}`}>
          <Component {...pageProps} />
        </div>
        <GlobalStyles />
      </ThemeProvider>
    </SessionProvider>
  );
}
