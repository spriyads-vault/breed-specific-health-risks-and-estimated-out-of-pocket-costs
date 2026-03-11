import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Risk {
  condition: string;
  description: string;
  averageCostAUD: number;
  typicalOnsetAge: string;
  lifeStage: string;
}

export interface RiskAssessment {
  risks: Risk[];
}

export async function getBreedRisks(breed: string, age: string): Promise<RiskAssessment> {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Analyze the dog breed "${breed}" at age "${age}". Provide exactly 3 common genetic health risks for this breed, including the average out-of-pocket surgery/treatment costs in AUD, and the typical onset age/life stage.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          risks: {
            type: Type.ARRAY,
            description: "Exactly 3 common genetic health risks for the breed.",
            items: {
              type: Type.OBJECT,
              properties: {
                condition: { type: Type.STRING, description: "Name of the condition" },
                description: { type: Type.STRING, description: "Short description of the condition and its impact" },
                averageCostAUD: { type: Type.INTEGER, description: "Average out-of-pocket surgery/treatment cost in AUD" },
                typicalOnsetAge: { type: Type.STRING, description: "e.g., 1-3 years" },
                lifeStage: { type: Type.STRING, description: "Puppy, Adult, or Senior" }
              },
              required: ["condition", "description", "averageCostAUD", "typicalOnsetAge", "lifeStage"]
            }
          }
        },
        required: ["risks"]
      },
      systemInstruction: "You are an expert veterinary data analyst. Provide accurate, realistic, and serious health risk data for dog breeds to educate owners about potential future vet bills. Costs should be realistic for Australian veterinary care.",
      temperature: 0.2,
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate risk assessment.");
  }

  return JSON.parse(response.text) as RiskAssessment;
}
