import './globals.scss';
import localFont from 'next/font/local';
import React, { ReactNode } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

const grotesk = localFont({
  src: [
    {
      path: './fonts/Grotesk-02Mince.woff',
      weight: '100',
    },
    {
      path: './fonts/Grotesk-03Regular.woff',
      weight: '400',
    },
    {
      path: './fonts/Grotesk-04Gras.woff',
      weight: '900',
    },
  ],
  variable: '--font-grotesk',
});

const ddin = localFont({
  src: [
    {
      path: './fonts/D-DIN.woff',
      weight: '300',
    },
    {
      path: './fonts/D-DIN-Bold.woff',
      weight: '700',
    },
  ],
  variable: '--font-ddin',
});

export const metadata = {
  title: {
    default: 'Home | Vector',
    template: '%s | Vector',
  },

  description: 'Vector: The Virus Shop',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${grotesk.variable} ${ddin.variable}`}>
        <div id="outerContainer">
          <Header />
          <main className="sm:pt-0 grow" id="pageWrap">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
