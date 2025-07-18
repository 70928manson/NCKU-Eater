import { GoogleAnalytics } from '@next/third-parties/google'

import type { Metadata } from "next";
import { Inter, Mochiy_Pop_One } from "next/font/google";
import "./globals.css";

import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import ReduxProvider from "@/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });
const mochiy_PopOne = Mochiy_Pop_One({ weight: ["400"], subsets: ["latin"] });
// other good font: Huninn(粉圓體), Mochiy Pop One, Potta One, BIZ UDPMincho, Zen Maru Gothic, NotoSerifTC

const gaId = process.env.NEXT_PUBLIC_GA_ID || '';

export const metadata: Metadata = {
    title: "NCKU Eater 2.0 | 成大美食抽抽樂",
    description: "探索台南成功大學附近的必吃美食，讓美食抽抽樂 NCKU Eater 替你解決不知道要吃什麼的煩惱",
    keywords: ['成大', '成功大學', 'NCKU', '台南', '成大美食推薦', '成大附近好吃的', '不知道吃什麼'],
    verification: {
        google: '-BSThK2Ki5W6D4AL-CW8xgyuN3jiTEprX2LfeeN7A48',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${mochiy_PopOne.className} ${inter.className}`}>
                <AuthContext>
                    <ReduxProvider>
                        <ToasterContext />
                        {children}
                    </ReduxProvider>
                </AuthContext>
            </body>
            <GoogleAnalytics gaId={gaId} />
        </html>
    );
}
