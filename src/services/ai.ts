import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface InvitationData {
  brideName: string;
  groomName: string;
  city: string;
  venue: string;
  locationLink: string;
  contactNumber: string;
  hostName: string;
  hostRelation: string;
  guestName: string;
  guestAge: string;
  guestRelation: string;
  guestPersonality: string;
  style: string;
  fontFamily?: string;
  backgroundImage?: string | null;
  couplePhoto?: string | null;
  date: string;
  time: string;
}

export async function generateInvitationMessage(data: InvitationData): Promise<string> {
  const prompt = `
    You are an expert Arabic copywriter specializing in elegant and culturally appropriate wedding invitations.
    Generate ONLY the main body text of a wedding invitation in Arabic. Do not include headers, footers, or the names of the bride and groom at the top (I will place those in the design myself). Focus on the welcoming message and the details.
    
    Details:
    - Host: ${data.hostName} (Relation to couple: ${data.hostRelation})
    - Bride: ${data.brideName}
    - Groom: ${data.groomName}
    - Invitee Name: ${data.guestName}
    - Invitee Age: ${data.guestAge}
    - Relationship with Invitee: ${data.guestRelation}
    - Invitee Personality: ${data.guestPersonality}
    - City: ${data.city}
    - Venue: ${data.venue}
    - Date: ${data.date}
    - Time: ${data.time}
    
    Instructions:
    1. The language MUST be beautiful, eloquent Arabic.
    2. Crucially, adjust the tone based on the "Relationship with Invitee" and their "Personality".
       - If formal (e.g., boss, elder), use highly respectful terms (حضرة، سيادة).
       - If friendly/close (e.g., best friend, youth), use warm, inviting, and joyful language.
    3. Include a welcoming opening on behalf of the host. If appropriate, you can start the core message with something like "يسرنا دعوتكم لحضور حفل زفاف...".
    4. State that they are invited to celebrate the wedding of the bride and groom.
    5. Mention the venue, city, date, and time smoothly in the text.
    6. Return ONLY the Arabic text paragraphs. No markdown, no English.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "حدث خطأ أثناء توليد النص.";
  } catch (error: any) {
    console.error("Error generating text:", error);
    if (error?.status === 503 || error?.message?.includes('503')) {
      return "عذراً، النظام يواجه ضغطاً كبيراً حالياً. يرجى المحاولة مرة أخرى بعد قليل.";
    }
    return "عذراً، حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.";
  }
}

export async function generateInvitationDesign(data: InvitationData): Promise<string | null> {
  const designPrompt = `A high-quality, elegant vertical wedding invitation background. 
    Style: ${data.style}. 
    ${data.couplePhoto ? 'Maintain an elegant, artistic theme that complements the provided photo of the bride/couple. Incorporate similar colors and floral/geometric patterns.' : ''}
    The background should be artistic with floral or geometric patterns around the edges, but the center MUST be clean and empty (solid light color or very subtle texture) to allow for text overlay. 
    No text, no letters, no typography. 
    High resolution, professional design. inspired by colors suitable for a wedding.`;

  try {
    const parts: any[] = [{ text: designPrompt }];

    if (data.couplePhoto && data.couplePhoto.startsWith('data:')) {
      const base64Data = data.couplePhoto.split(',')[1];
      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/png"
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: parts,
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error generating design:", error);
    return null;
  }
}
