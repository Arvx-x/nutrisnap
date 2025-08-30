import { GoogleGenerativeAI } from "@google/generative-ai";

type Macros = {
  name?: string;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fats_g?: number;
  sugar_g?: number;
};

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return Buffer.from(binary, "binary").toString("base64");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: "No image file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Server missing Gemini API key" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const arrayBuffer = await file.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);

    const prompt = `You are a nutrition analyst. Identify the primary food in the photo and estimate common macros. 
Respond ONLY with JSON using these keys: 
{
  "name": string, 
  "calories": number, 
  "protein_g": number, 
  "carbs_g": number, 
  "fats_g": number, 
  "sugar_g": number
}
Numbers should be approximate per serving shown. No extra text.`;

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: file.type || "image/jpeg",
          data: base64,
        },
      },
    ]);

    const text = result.response.text();
    let data: Macros | null = null;
    try {
      data = JSON.parse(text) as Macros;
    } catch (_) {
      // best-effort fallback: extract numbers using regex
      const getNum = (key: string) => {
        const m = new RegExp(`${key}[^0-9]*([0-9]+)`, "i").exec(text);
        return m ? Number(m[1]) : undefined;
      };
      data = {
        name: /name\s*[:=]\s*"([^"]+)"/i.exec(text)?.[1],
        calories: getNum("calories"),
        protein_g: getNum("protein"),
        carbs_g: getNum("carbs"),
        fats_g: getNum("fat"),
        sugar_g: getNum("sugar"),
      };
    }

    return new Response(JSON.stringify({ result: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


