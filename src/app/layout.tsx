import './globals.css';
import type { Metadata } from 'next';
import NavBar from '@/components/site/NavBar';
import Footer from '@/components/site/Footer';

export const metadata: Metadata = {
  title: 'KSAFM Conference',
  description: 'Conference website ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className='min-h-screen bg-white text-gray-900'>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
