import './globals.css';

export const metadata = {
  title: 'Touristaa Travel Company | Memorable Journeys',
  description: 'Affordable, safe and comfortable domestic, international and educational tours.',
  icons: {
    icon: '/touristaa-logo.svg',
    shortcut: '/touristaa-logo.svg',
    apple: '/touristaa-logo.svg',
  },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
