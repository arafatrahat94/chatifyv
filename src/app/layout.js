import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers";
import Wait from "@/Utilities/Wait";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatify",
  description: "An Social Media Web Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className="transition-all">
      <body className={`${inter.className}  mx-auto`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
