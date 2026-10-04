import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solidity Master | Interactive Smart Contract Learning Platform",
  description: "Master Solidity from absolute beginner to advanced EVM architect with interactive coding, compiler feedback, AI tutoring, and security audits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
