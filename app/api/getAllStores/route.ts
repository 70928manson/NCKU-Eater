import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://sheets.googleapis.com/v4/spreadsheets/";

export async function GET() {
    try {
        const { APP_ID, APP_SHEET, APP_KEY } = process.env;

        const url = `${DATA_SOURCE_URL}${APP_ID}/values/${APP_SHEET}?alt=json&key=${APP_KEY}`;
        const res = await fetch(url);

        const stores = await res.json();

        return NextResponse.json(stores);
    }
    catch (err: any) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}