// import { NextResponse } from "next/server";
// import generate from "@/controllers/questionGeneration.controller";

// // export async function GET(){
// //     return NextResponse.json({ message: "Hello World" });
// // }

// export async function POST(request){
//     let { inputParagraph, noOfQuestions } = await request.json();
//     if (!inputParagraph) {
//         throw new Error('Input paragraph is empty');
//     }
//     if (!noOfQuestions) {
//         noOfQuestions = 5;
//     }
//     const questions = await generate(inputParagraph, noOfQuestions);
//     return NextResponse.json({ questions });
// }