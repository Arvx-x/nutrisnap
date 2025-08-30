import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question: string | undefined = body?.question;
    const meal = body?.meal;

    if (!question || typeof question !== "string" || !meal) {
      return new Response(
        JSON.stringify({ error: "Missing 'question' or 'meal' in request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const primaryKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const backupKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY_BACKUP;
    if (!primaryKey && !backupKey) {
      return new Response(JSON.stringify({ error: "Server missing Gemini API key(s)" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const context = `Meal Profile\n---\nName: ${meal.name}\nCalories: ${meal.calories}\nProtein: ${meal.protein}\nCarbs: ${meal.carbs}\nFat: ${meal.fat}\nSummary: ${meal.summary}\nDescription: ${meal.description}\n\nTask: You are a culinary nutrition assistant. Use the Meal Profile as ground truth.\n- Explain nutrition in plain language (macros, calories, balance).\n- Provide a concise ingredient list (best-guess) and a simple recipe with steps.\n- Offer healthy substitutions/alternatives (dietary needs, budget).\n- If user asks to modify meal, give specific adjustments and updated macros qualitatively.\n- Keep responses compact, scannable, and actionable.\n`;

    const prompt = `${context}\nUser Question: ${question}`;

    const isQuotaError = (err: unknown) => {
      const msg = err instanceof Error ? err.message.toLowerCase() : String(err).toLowerCase();
      return (
        msg.includes("rate") ||
        msg.includes("quota") ||
        msg.includes("exceed") ||
        msg.includes("429") ||
        msg.includes("insufficient") ||
        msg.includes("exhaust")
      );
    };

    async function generateWithKey(key: string) {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([{ text: prompt }]);
      return result.response.text();
    }

    let answer: string;
    try {
      const keyToUse = primaryKey || backupKey!;
      answer = await generateWithKey(keyToUse);
    } catch (err) {
      if (backupKey && primaryKey && isQuotaError(err)) {
        // Retry with backup key on quota/rate errors
        answer = await generateWithKey(backupKey);
      } else {
        throw err;
      }
    }

    return new Response(JSON.stringify({ answer }), {
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


