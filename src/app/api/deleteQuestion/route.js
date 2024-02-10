import deleteQuestion from "@/controllers/deleteQuestion.controller";
import { NextResponse } from "next/server";

export async function POST(request) {
  // const token = request.cookies.get("token");
  const {questionId} = await request.json();
  // console.log("questionId in route", questionId);
  try {
    const result = await deleteQuestion(questionId);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
}
