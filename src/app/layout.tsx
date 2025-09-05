import type { Metadata } from "next";
import { Geist, Geist_Mono, Cal_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/context/theme-provider";
import { VariantProvider } from "./context/code-context";
import { SearchProvider } from "./context/search-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const calSans = Cal_Sans({
  variable: "--font-cal-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Repeat UI",
  description:
    "A modern, customizable React component library with live editing and copy-paste integration. Build UIs faster with beautiful, ready-to-use components.",
  icons: {
    icon: "/Logo.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
        className={`${geistSans.variable} ${geistMono.variable} ${calSans.variable}  antialiased`}>
        <VariantProvider>
          <SearchProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </SearchProvider>
        </VariantProvider>
      </body>
    </html>
  );
}
