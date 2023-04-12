import { theme } from '../styles/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Open_Sans } from '@next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <div className={openSans.className}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
