
import { GoogleGenAI, Type } from "@google/genai";

export const getAIStylistRecommendation = async (userInput: string, imageData?: string) => {
  // 遵循規範：每次調用時創建實例，並直接使用 process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const contents: any[] = [{ text: `你是一位來自「PDN 專業美甲」的高級美甲設計師。
  
  你的品牌規範與語氣：
  1. 專業、優雅、溫暖，使用繁體中文（台灣）。
  2. 我們【僅提供手部凝膠美甲服務】，絕不推薦任何足部、SPA 或全身服務。
  3. 你的主理人是 Eating，擅長細膩的手繪藝術（如吉卜力系列、節慶手繪）與質感的暈染、貓眼石紋。
  
  顧客需求： "${userInput}"
  
  請根據顧客的需求提供專業設計建議。如果顧客上傳了圖片，請分析其風格並結合 PDN 的手部美學進行推薦。建議應包含色彩搭配理由與適合場合。` }];
  
  if (imageData) {
    const mimeType = imageData.substring(imageData.indexOf(":") + 1, imageData.indexOf(";"));
    contents.push({
      inlineData: {
        mimeType: mimeType || 'image/jpeg',
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
            description: "推薦色系的名稱或 Hex"
          },
          style: {
            type: Type.STRING,
            description: "建議的款式名稱"
          },
          advice: {
            type: Type.STRING,
            description: "給顧客的專業設計建議"
          },
          matchingOccasions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "適合的場合"
          }
        },
        required: ["colors", "style", "advice", "matchingOccasions"]
      }
    }
  });

  const text = response.text;
  if (!text) return { colors: [], style: "無法生成建議", advice: "請稍後再試", matchingOccasions: [] };
  
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("JSON Parse Error", e);
    return { colors: [], style: "解析錯誤", advice: "AI 回應格式異常", matchingOccasions: [] };
  }
};
