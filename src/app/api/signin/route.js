import signinController from "@/controllers/signin.controller";
import { NextResponse } from "next/server";
import {cookies} from "next/headers";


export async function POST(request) {
    try {
        let { email, password } = await request.json();
        const user = await signinController(email, password);
        const oneDay = 24 * 60 * 60 * 1000;
        cookies().set("token",user.token)
        return NextResponse.json({message: user.token },{status:200});
    } catch (error) {
        // console.log(error)
        return NextResponse.json({message:error.message},{status:error.statusCode});
    }
}
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     let { email, password } = await request.json();
//     const user = await signinController(email, password);

//     // Create a new NextResponse object
//     const response = NextResponse.json({message: user.token },{status:200});

//     // Set the 'Set-Cookie' header
//     response.setHeader('Set-Cookie', `token=${user.token}; Path=/; HttpOnly; SameSite=Lax;`);

//     return response;
//   } catch (error) {
//     return NextResponse.json({message:error.message},{status:error.statusCode});
//   }
// }