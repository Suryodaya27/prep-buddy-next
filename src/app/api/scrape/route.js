import scraper from "@/controllers/scraper.controller";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        let { url } = await request.json();
        const scrapedData = await scraper(url);
        return NextResponse.json({ scrapedData },{status:201});
    } catch (error) {
        return NextResponse.json({message:error.message},{status:error.statusCode});
    }
}