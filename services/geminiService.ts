
import { GoogleGenAI, Type } from "@google/genai";

// 修正初始化方式，嚴格遵守 SDK 規範
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIStylistRecommendation = async (userInput: string, imageData?: string) => {
  const model = 'gemini-3-flash-preview';
  
  const contents: any[] = [{ text: `你是一位來自「PDN 專業美甲」的高級美甲設計師。
  
  你的品牌規範與語氣：
  1. 專業、優雅、溫暖，使用繁體中文（台灣）。
  2. 我們【僅提供手部凝膠美甲服務】，絕不推薦任何足部、SPA 或全身服務。
  3. 你的主理人是 Eating，擅長細膩的手繪藝術（如吉卜力系列、節慶手繪）與質感的暈染貓眼。
  
  顧客需求： "${userInput}"
  
  請根據顧客的需求提供專業設計建議。如果顧客上傳了圖片（穿搭或參考圖），請分析圖片的色調與風格，並結合 PDN 的手部技術進行推薦。建議應包含色彩搭配理由與適合的場合。` }];
  
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
            description: "推薦色系的 Hex Code 或名稱"
          },
          style: {
            type: Type.STRING,
            description: "設計款式的名稱"
          },
          advice: {
            type: Type.STRING,
            description: "專業設計師建議內容"
          },
          matchingOccasions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "適合的場合標籤"
          }
        },
        required: ["colors", "style", "advice", "matchingOccasions"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
