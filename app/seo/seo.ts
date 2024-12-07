import { Metadata } from "next";

export const seoMetadata: Metadata = {
    metadataBase: new URL('https://ncku-eater.vercel.app/'),
    title: {
        default: "NCKU Eater 2.0 | 成大美食抽抽樂",
        template: "%s | NCKU Eater 2.0"
    },
    description: "台南成大美食抽抽樂 | NCKU Eater 2.0 帶你探索台南成大周邊那些你未曾想到的美食，輕鬆搞定每天煩惱不知道吃什麼的人生難題",
    keywords: [
        '成大美食',
        '台南美食',
        '成功大學周邊美食',
        '成大附近餐廳',
        '台南大學美食',
        '成大推薦美食',
        '不知道吃什麼',
        'NCKU Eater'
    ],
    verification: {
        google: '-BSThK2Ki5W6D4AL-CW8xgyuN3jiTEprX2LfeeN7A48',
    },
    openGraph: {
        title: 'NCKU Eater 2.0 | 成大美食抽抽樂',
        description: "台南成大美食抽抽樂 | NCKU Eater 2.0 帶你探索台南成大周邊那些你未曾想到的美食，輕鬆搞定每天煩惱不知道吃什麼的人生難題",
        type: 'website',
        locale: 'zh_TW',
        images: [
            {
                url: '/assets/logo.webp', // png
                width: 1200,
                height: 1200,
                alt: 'NCKU Eater Logo',    // 加上 alt 文字提升無障礙性和SEO
            },
        ],
    },
};
