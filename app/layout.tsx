import "./globals.css";
import "leaflet/dist/leaflet.css";
import { ReactNode } from "react";

export const metadata = {
  title: "AQI India",
  description: "Live AQI across Indian cities",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
