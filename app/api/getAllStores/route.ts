import { NextResponse } from "next/server";
import { Store } from "@/app/types/store";

const DATA_SOURCE_URL = "https://sheets.googleapis.com/v4/spreadsheets/";

type GoogleSheetResponse = {
    majorDimension: string;
    range: string;
    values: string[][];
}

export async function GET() {
    try {
        const { APP_ID, APP_SHEET, APP_KEY } = process.env;

        const url = `${DATA_SOURCE_URL}${APP_ID}/values/${APP_SHEET}?alt=json&key=${APP_KEY}`;
        const res = await fetch(url);
        const jsonRes: GoogleSheetResponse = await res.json();

        const stores = jsonRes?.values || [];

        // 把 response 組成我們想要的資料形式
        const result: Store[] = stores.map((storeData: string[]) => {
            const tags = storeData[1].split(',').map(item => item.trim());
            return {
                id: "",
                title: storeData[0],
                tags: tags,
                src: storeData[2],
            };
        }).slice(1);

        return NextResponse.json(result);
    }
    catch (err: any) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}