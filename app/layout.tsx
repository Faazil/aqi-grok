import './globals.css';

export const metadata = {
  title: 'Live AQI India',
  description: 'Real-time Air Quality Index across Indian cities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          overflowX: 'hidden',
          boxSizing: 'border-box',
          background: '#000',
        }}
      >
        {children}
      </body>
    </html>
  );
}
