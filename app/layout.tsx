import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Builtframe — Client Portal for Developers",
  description: "The all-in-one client portal for freelance developers and small agencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
