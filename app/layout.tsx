import type { Metadata } from "next";
import { Inter, Mochiy_Pop_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });
const mochiyPopOne = Mochiy_Pop_One({ weight: ["400"], subsets: ["latin"] });
// other good font: Mochiy Pop One, Potta One, BIZ UDPMincho, Zen Maru Gothic, NotoSerifTC

export const metadata: Metadata = {
  title: "NCKU Eater 2.0",
  description: "成大吃貨2.0, 美食抽抽樂",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mochiyPopOne.className} ${inter.className}`}>
        <AuthContext>
          <ToasterContext />
          <Navbar />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
