import { NextResponse } from "next/server";
import pdf from "pdf-parse";

export async function POST(request) {
    try {
        console.log("inside parse");
        const formData = await request.formData();
        const file = formData.get("file");
        // console.log(file);
        const buffer = await file.arrayBuffer();

        const data = await pdf(buffer);

        console.log(data.text);
        return NextResponse.json({ text: data.text, status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "something went wrong" || error.message },
            { status: 500 || error.statusCode }
        );
    }
}
