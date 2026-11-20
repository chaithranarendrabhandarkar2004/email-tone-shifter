
import { GoogleGenAI, Type } from "@google/genai";
import { ToneType, LengthType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const shiftTone = async (
  draft: string, 
  tone: ToneType, 
  length: LengthType
): Promise<string> => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are an expert Corporate Communications Specialist and Executive Ghostwriter. 
    Your mission is to take "messy", frustrated, angry, or poorly structured email drafts and rewrite them into professional, polite, and effective corporate communications.
    
    CRITICAL GUIDELINES:
    1. MAINTAIN CORE MESSAGE: Don't lose the user's actual point, just the unprofessional delivery.
    2. STRIP AGGRESSION: Remove passive-aggressiveness, sarcasm, and anger.
    3. ADD POLISH: Use professional greetings, standard corporate transitions, and respectful sign-offs.
    4. TONE ADJUSTMENT: Adhere strictly to the requested tone:
       - Professional: Balanced, standard office communication.
       - Empathetic: Warm, understanding, focuses on relationship building.
       - Direct & Concise: Bullet points, minimal fluff, action-oriented.
       - Executive Brief: High-level, value-focused, respects a busy person's time.
       - Sincere Apology: Takes ownership without over-explaining, focuses on the fix.
    5. LENGTH ADJUSTMENT: Follow the requested length (${length}).
    6. NO HALLUCINATIONS: Do not invent names or dates unless provided in the draft. Use [Name], [Date], or [Project] as placeholders if information is missing but needed.
  `;

  const prompt = `
    DRAFT TO SHIFT:
    """
    ${draft}
    """

    REQUESTED TONE: ${tone}
    REQUESTED LENGTH: ${length}

    Please rewrite this email now. Provide ONLY the email content, no commentary before or after.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that draft. Please try again with more context.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to shift tone. Please check your connection and try again.");
  }
};
