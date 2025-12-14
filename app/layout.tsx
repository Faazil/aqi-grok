import './globals.css';

export const metadata = {
  title: 'Live AQI India',
  description: 'Real-time Air Quality Index across India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
