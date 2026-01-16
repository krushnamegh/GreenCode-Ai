import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

// Use gemini-3-pro-preview for complex reasoning as per user goal + system instructions
const MODEL_NAME = 'gemini-3-pro-preview';

export const analyzeCode = async (
  code: string,
  language: string
): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY is missing from environment variables');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are a green software engineering expert.
    Analyze the provided ${language} source code.
    
    Tasks:
    1. Identify inefficient or energy-heavy constructs (Big O complexity, memory leaks, I/O blocking).
    2. Estimate computational complexity and resource usage.
    3. Approximate energy consumption and CO₂ emissions for a hypothetical 1 million executions.
    4. Assign a carbon efficiency score (0–100), where 100 is perfectly optimized.
    5. Suggest optimized, greener code alternatives that maintain functionality but reduce resource usage.
    6. Estimate percentage reduction in energy and carbon footprint.
    7. Explain recommendations clearly.

    Source Code:
    ${code}
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            carbon_score: { type: Type.INTEGER, description: "A score from 0 to 100 representing carbon efficiency." },
            energy_estimate: { type: Type.STRING, description: "Estimated energy usage (e.g., '0.45 kWh per 1M executions')." },
            co2_emissions: { type: Type.STRING, description: "Estimated CO2 emissions (e.g., '180 g CO2')." },
            hotspots: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  issue: { type: Type.STRING },
                  impact: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
                  suggestion: { type: Type.STRING }
                }
              }
            },
            optimized_code: { type: Type.STRING, description: "The full refined, optimized source code." },
            carbon_reduction_estimate: { type: Type.STRING, description: "Estimated % reduction (e.g., '35%')." },
            explanation: { type: Type.STRING, description: "Detailed explanation of the changes and why they save energy." }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};
