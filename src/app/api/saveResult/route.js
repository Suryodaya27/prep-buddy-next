import saveResult from "@/controllers/saveResult.controller";
import { NextResponse } from "next/server";

export async function POST(request) {
    // console.log(req);
    const token = request.cookies.get("token")
    // console.log(token.value);
    try {
        let { score,total,time } = await request.json();
        // console.log( score,total,time,token.value);
        const result = await saveResult(score,total,time,token.value);
        return NextResponse.json({ result },{status:201});
    } catch (error) {
        return NextResponse.json({message:error.message},{status:error.statusCode});
    }
}