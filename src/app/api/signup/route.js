import signupController from "@/controllers/signup.controller";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        let { email, password } = await request.json();
        // console.log(email, password);
        const user = await signupController(email, password);
        return NextResponse.json({ user },{status:201});
    } catch (error) {
        // console.log(error)
        return NextResponse.json({message:error.message},{status:error.statusCode});
    }
}
