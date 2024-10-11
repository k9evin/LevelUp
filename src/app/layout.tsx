import { cn } from '@/lib/utils';
import './globals.css';
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const lexend = Lexend({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LevelUp - AI-powered learning platform',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(lexend.className, 'antialiased min-h-screen')}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
