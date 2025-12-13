const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyBxVZMmhaXKPRnC9S-jCndDzyZyZelk3TU";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        console.log("Fetching available models...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Dummy init to get access to client if needed, but actually we need the model manager if available, or just try a standard one.
        // The SDK doesn't have a direct "listModels" on the instance in some versions, but let's try a simple generation on two common models to see which one works.

        const modelsToTest = ["gemini-pro", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];

        for (const modelName of modelsToTest) {
            console.log(`Testing model: ${modelName}`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                const response = await result.response;
                console.log(`SUCCESS: ${modelName} responded: ${response.text()}`);
                return; // Found a working one
            } catch (e) {
                console.log(`FAILED: ${modelName} - ${e.message.split('\n')[0]}`);
            }
        }
    } catch (error) {
        console.error("Global Error:", error);
    }
}

listModels();
