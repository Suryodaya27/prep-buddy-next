import saveQuestionToQuiz from "@/controllers/saveQuestionToQuiz.controller";
import { NextResponse } from "next/server";

export async function POST(request) {
    // console.log(req);
    // console.log(token.value);
    try {
        let { quizId,question,answer } = await request.json();
        // console.log(question,answer,token.value);
        const result = await saveQuestionToQuiz(quizId,question,answer);
        return NextResponse.json( result.result ,{status:201});
    } catch (error) {
        return NextResponse.json({message:error.message},{status:error.statusCode});
    }
}