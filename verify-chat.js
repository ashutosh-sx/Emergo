require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = (process.env.GEMINI_API_KEY || "").replace(/"/g, "");
const genAI = new GoogleGenerativeAI(API_KEY);

async function main() {
    try {
        console.log("Initializing model: gemini-2.5-flash");
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = "Hello, this is a test.";
        console.log("Generating content...");

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("SUCCESS:", text);
    } catch (error) {
        console.error("FAILED with error:", error);
    }
}

main();
