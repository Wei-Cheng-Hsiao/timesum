import { GoogleGenAI, Type } from "@google/genai";
import { AiCalculationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const calculateTimeWithAI = async (
  query: string, 
  currentTime: string
): Promise<AiCalculationResponse> => {
  try {
    const prompt = `
      Current time: ${currentTime} (24-hour format).
      User Request: ${query}
      
      Task: Calculate the new time based on the user's request. 
      The user might say "add 30 minutes" or "what time is it in 5 hours".
      Assume the base time is the Current Time provided above unless the user explicitly specifies a different start time.
      Return the resulting time in strictly 24-hour format (HH:MM).
    `;

    // Updated model to gemini-3-flash-preview as per the latest guidelines for basic text tasks
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            resultingTime: {
              type: Type.STRING,
              description: "The calculated time in HH:MM 24-hour format",
            },
            explanation: {
              type: Type.STRING,
              description: "A very brief explanation of the calculation (e.g. '14:00 + 2h 30m')",
            },
          },
          required: ["resultingTime", "explanation"],
        },
      },
    });

    // Directly access the .text property from the GenerateContentResponse object
    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AiCalculationResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to calculate time with AI.");
  }
};