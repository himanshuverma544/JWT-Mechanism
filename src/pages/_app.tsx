import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });


export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>JWT Mechanism</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="JWT Mechanism" />
      </Head>
      <main
        className={`${inter.variable} antialiased`}
        style={{ padding: 20 }}
      >
        <Component {...pageProps}/>
      </main>
    </>
  );
}