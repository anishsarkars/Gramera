import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingMic from "@/components/FloatingMic";

export const metadata: Metadata = {
  title: "Gram Era | AI-Powered Bilingual Mentor Platform",
  description: "India's first AI-powered bilingual mentor & skill sharing community. Connect with mentors, talk to GramSathi, and explore immersive AI Avatars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ paddingTop: '80px' }}>
          {children}
        </main>
        <FloatingMic />
      </body>
    </html>
  );
}
