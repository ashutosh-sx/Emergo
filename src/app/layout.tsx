import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using Outfit for headings
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

import ChatBot from "@/components/ChatBot";

// Using Outfit for specific premium feel
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Emergo — Fast Aid, On the Way",
  description: "Emergo is an instant ambulance-booking platform that connects patients to the nearest available emergency vehicle in seconds, ensuring fast response and saving lives when time matters most.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased min-h-screen relative">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <ChatBot />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
