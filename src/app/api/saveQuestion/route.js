import saveQuestion from "@/controllers/saveQuestion.controller";
import { NextResponse } from "next/server";

export async function POST(request) {
    // console.log(req);
    const token = request.cookies.get("token")
    // console.log(token.value);
    try {
        let { question,answer } = await request.json();
        // console.log(question,answer,token.value);
        const result = await saveQuestion(question,answer,token.value);
        return NextResponse.json({ result },{status:201});
    } catch (error) {
        return NextResponse.json({message:error.message},{status:error.statusCode});
    }
}