import type { Metadata } from "next";
import { Geist, Geist_Mono, Ubuntu } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/context/theme-provider";
import { VariantProvider } from "./context/code-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Repeat UI",
  description:
    "A modern, customizable React component library with live editing and copy-paste integration. Build UIs faster with beautiful, ready-to-use components.",
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.variable} antialiased`}>
        <VariantProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </VariantProvider>
      </body>
    </html>
  );
}
