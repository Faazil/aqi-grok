import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "AQI India",
  description: "Live AQI across Indian cities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
