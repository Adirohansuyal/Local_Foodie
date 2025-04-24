import { GoogleGenerativeAI } from "@google/generative-ai";

// Access the API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY || "";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);

// The model to use - trying a different model version
const MODEL_NAME = "gemini-1.5-pro";

export async function generateResponse(prompt: string): Promise<string> {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Use the system prompt to give context to the model
    const systemPrompt = `
      You are an AI assistant for LocalFoodie, a food delivery service focused on local cuisine.
      Your name is "FoodieBot". Respond in a friendly, helpful manner about:
      - Restaurant recommendations
      - Local cuisine information
      - Food delivery questions
      - Dietary preferences and restrictions
      - Popular local dishes
      Keep responses concise (under 100 words) unless the user asks for detailed information.
      If asked about something unrelated to food, restaurants, or the LocalFoodie service, 
      politely redirect the conversation back to food and LocalFoodie services.
    `;

    // Combine the system prompt with the user's prompt
    const fullPrompt = `${systemPrompt}\n\nUser: ${prompt}\n\nFoodieBot:`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    return "I'm sorry, I'm having trouble connecting to my services right now. Please try again later.";
  }
}