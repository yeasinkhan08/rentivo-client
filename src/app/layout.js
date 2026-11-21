import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Navber from "@/components/shared/Navber";
import ToasterClient from "@/components/shared/ToasterClient";
import Footer from "@/components/shared/Footer";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Applies the saved theme before paint so dark mode does not flash on load.
// The design reference is dark, so dark is used when no preference is saved.
const themeInit = `try{var t=localStorage.getItem("rentivo-theme");var d=t?t==="dark":true;document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}`;

export const metadata = {
  title: "RENTIVO — Rent equipment with confidence",
  description:
    "Rentivo connects contractors and teams with trusted construction equipment. Browse, compare and book the right tools in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navber />
        {children}
        <Footer />
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInit}
        </Script>
        <ToasterClient />
      </body>
    </html>
  );
}
