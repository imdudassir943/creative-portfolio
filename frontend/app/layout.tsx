import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Pinyon_Script } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { SmoothScroll } from '@/components/smooth-scroll';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { CustomCursor } from '@/components/custom-cursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-signature',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL || 'http://localhost:3000'),
  title: 'Portfolio | Creative Developer',
  description: 'Award-winning creative developer crafting exceptional digital experiences with cutting-edge technology and stunning design.',
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Portfolio | Creative Developer',
    description: 'Award-winning creative developer crafting exceptional digital experiences.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Creative Developer',
    description: 'Award-winning creative developer crafting exceptional digital experiences.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${pinyonScript.variable} font-sans bg-dark-900 overflow-x-hidden`}>
        <SmoothScroll>
          <CustomCursor />
          <Navigation />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
