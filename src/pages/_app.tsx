import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });


export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <main
      className={`${inter.variable} antialiased`}
      style={{ padding: 20 }}
    >
      <Component {...pageProps}/>
    </main>
  );
}