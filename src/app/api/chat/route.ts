import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = (process.env.GEMINI_API_KEY || "").replace(/"/g, "");

// Debug logging
console.log("Chat API initialized. Key provided:", !!API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        if (!API_KEY) {
            console.error("Missing Gemini API Key in environment variables.");
            return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 });
        }

        // Using gemini-2.5-flash as it has higher quota and is available
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
            You are a helpful and empathetic medical assistant for an ambulance booking platform called Emergo. 
            Your goal is to help users by asking about their symptoms and suggesting possible illnesses or advice.
            
            - If the user provides symptoms, suggest possible causes but ALWAYS include a disclaimer that you are an AI and they should consult a doctor.
            - If the symptoms seem clear (e.g., chest pain, difficulty breathing), advise them to book an ambulance immediately or call emergency services.
            - Keep your responses concise and easy to read.
            - Do not answer questions unrelated to health or the platform.

            User: ${message}
            Assistant:
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
