import askAi from "@/controllers/askAi.controller";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {question,answer} = await request.json();
  try {
    const result = await askAi(question,answer);
    return NextResponse.json( result , { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
}
