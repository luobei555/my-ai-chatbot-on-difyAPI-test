import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedAsk AI",
  description: "An app for medical consultations."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
