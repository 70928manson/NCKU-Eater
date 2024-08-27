import type { Metadata } from "next";
import { Inter, Mochiy_Pop_One } from "next/font/google";
import "../globals.css";

import ToasterContext from "../context/ToasterContext";
import AuthContext from "../context/AuthContext";
import ReduxProvider from "@/redux/ReduxProvider";

import Navbar from "@/components/shared/navbar/Navbar";
import Sidebar from "@/components/shared/sidebar/Sidebar"
import Footer from "@/components/shared/footer/Footer";

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
          <ReduxProvider>
            <ToasterContext />
            <Navbar />
            <main className="flex flex-row">
              <Sidebar />
              <section className="main-container">
                <div className="w-full max-w-4xl mx-auto">
                  {children}
                </div>
              </section>
            </main>
            <Footer />
          </ReduxProvider>
        </AuthContext>
      </body>
    </html>
  );
}
