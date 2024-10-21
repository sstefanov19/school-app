import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import  QueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex antialiased`}>
        <SessionProviderWrapper>

        <QueryProvider>
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
        <Header />
        <div className="min-h-screen">
        <div id="modal-root" />
        {children}
        <Toaster />
        </div>
        </div>
     </QueryProvider>
     </SessionProviderWrapper>
      </body>
    </html>
  );
}
