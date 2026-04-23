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
    
    Instructions:
    1. The language MUST be beautiful, eloquent Arabic.
    2. Crucially, adjust the tone based on the "Relationship with Invitee" and their "Personality".
       - If formal (e.g., boss, elder), use highly respectful terms (حضرة، سيادة).
       - If friendly/close (e.g., best friend, youth), use warm, inviting, and joyful language.
    3. Include a welcoming opening on behalf of the host. If appropriate, you can start the core message with something like "يسرنا دعوتكم لحضور حفل زفاف...".
    4. State that they are invited to celebrate the wedding of the bride and groom.
    5. Mention the venue and city smoothly in the text.
    6. Return ONLY the Arabic text paragraphs. No markdown, no English.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "حدث خطأ أثناء توليد النص.";
  } catch (error) {
    console.error("Error generating text:", error);
    return "عذراً، حدث خطأ في النظام.";
  }
}
