import type { Metadata } from "next";
import "../globals.css";

import Navbar from "@/components/shared/navbar/Navbar";
import Sidebar from "@/components/shared/sidebar/Sidebar"
import Footer from "@/components/shared/footer/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "NCKU Eater 2.0 | 成大美食抽抽樂"
  }
};

export default function DrawLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex flex-row">
        <Sidebar />
        <section className="main-container">
          <div className="w-full max-w-4xl h-full mx-auto">
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
