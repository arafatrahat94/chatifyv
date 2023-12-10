import { Rubik } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers";
import Wait from "@/Utilities/Wait";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
});

export const metadata = {
  title: "Chatify",
  description: "An Social Media Web Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className="transition-all">
      <body className={`${rubik.variable} font-rubik mx-auto`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
