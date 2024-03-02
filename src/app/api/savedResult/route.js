
import getResults from "@/controllers/Results.controller";

import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get("token");
  // console.log("token: ",token)
  try {
    const result = await getResults(token.value);
    // console.log(result.result);
    const newRes = result.result
    return NextResponse.json( newRes , { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
}
