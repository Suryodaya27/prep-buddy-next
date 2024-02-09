

import getSavedQuestions from "@/controllers/savedQuestion.controller";

import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get("token");
//   console.log(token.value)
  try {
    const result = await getSavedQuestions(token.value);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
}
