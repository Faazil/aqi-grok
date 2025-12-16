// app/layout.tsx
import './globals.css';

// You can customize the metadata here
export const metadata = {
  title: 'Live AQI India - Real-time Air Quality Index',
  description: 'Real-time Air Quality Index (AQI) data for major cities across India. Quick, clean, and essential environmental data.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* The built-in Next.js 'metadata' handles <title> and <meta name="description"> */}
        
        {/* =======================================================
          CRITICAL STEP: ADSense VERIFICATION CODE IMPLEMENTATION
          =======================================================
          
          NOTE: I have fixed 'crossorigin' to 'crossOrigin' (camel case).
          
          Place the entire <script> tag provided by Google AdSense here.
          The example below uses your actual client ID prefix (2115058796417473)
          that was visible in the error message for accuracy.
        */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2115058796417473"
          crossOrigin="anonymous">
        </script>
        
        {/* =======================================================
          END: ADSense CODE
          =======================================================
        */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
