require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

async function main() {
    try {
        console.log("Attempting to list models directly via REST to debug...");
        // The Node SDK might abstract this, so let's try a direct fetch if the SDK fails, 
        // but first let's try the SDK way if possible, or just a simple fetch using the key.

        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", data.error);
        } else if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods})`));
        } else {
            console.log("No models found or unexpected format:", data);
        }

    } catch (error) {
        console.error("Script Error:", error);
    }
}

main();
