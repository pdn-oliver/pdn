
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIStylistRecommendation = async (userInput: string, imageData?: string) => {
  const model = 'gemini-3-flash-preview';
  
  const contents: any[] = [{ text: `你是一位來自 PDN 專業美甲的專業日本風格美甲設計師。
  我們專注於「手部凝膠美甲藝術」，不提供足部或 SPA 服務。
  請根據顧客的需求： "${userInput}"，提供專業的建議。建議應著重於手型修飾、膚色襯托以及風格設計。` }];
  
  if (imageData) {
    contents.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageData.split(',')[1]
      }
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts: contents },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          colors: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Suggested color hex codes or names"
          },
          style: {
            type: Type.STRING,
            description: "A short name for the recommended style"
          },
          advice: {
            type: Type.STRING,
            description: "Professional advice in Traditional Chinese (Taiwan). Always maintain an elegant and welcoming tone."
          },
          matchingOccasions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of occasions this style fits"
          }
        },
        required: ["colors", "style", "advice", "matchingOccasions"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
