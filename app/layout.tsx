import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";





export const metadata: Metadata = {
  title: "Where Sam?",
  description: "Where's Sam in the world?",
};

const departureMono = localFont({
    src: "./fonts/DepartureMono-Regular.woff",
    variable: "--font-departure-mono",
});

import { ThemeProvider } from "@/app/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
        className={`relative flex min-h-screen flex-col bg-grid-small-black/[0.2] font-[family-name:var(--font-departure-mono)] ${departureMono.variable} `}>

    <ThemeProvider
        attribute="class"
        defaultTheme={'dark'}
        disableTransitionOnChange
    >
        {children}
    </ThemeProvider>
    </body>
    </html>
  );
}
