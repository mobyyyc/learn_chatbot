import { ai } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite-preview",
            contents: message
        });

        return NextResponse.json({ text: response.text });

    } catch (error) {
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}