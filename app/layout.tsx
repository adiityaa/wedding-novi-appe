import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jalan Saja - Appe & Novi",
  description: "Wedding Invitation Novi & Appe.",
  generator: "adityadwiaprianto",
  authors: [
    {
      name: "Aditya Dwi Aprianto",
      url: "https://www.linkedin.com/in/adityadwiaprianto/",
    },
  ],
  icons: {
    icon: [],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
