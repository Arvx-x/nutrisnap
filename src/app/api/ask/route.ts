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

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Server missing Gemini API key" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const context = `Meal Profile\n---\nName: ${meal.name}\nCalories: ${meal.calories}\nProtein: ${meal.protein}\nCarbs: ${meal.carbs}\nFat: ${meal.fat}\nSummary: ${meal.summary}\nDescription: ${meal.description}\n\nTask: You are a culinary nutrition assistant. Use the Meal Profile as ground truth.\n- Explain nutrition in plain language (macros, calories, balance).\n- Provide a concise ingredient list (best-guess) and a simple recipe with steps.\n- Offer healthy substitutions/alternatives (dietary needs, budget).\n- If user asks to modify meal, give specific adjustments and updated macros qualitatively.\n- Keep responses compact, scannable, and actionable.\n`;

    const prompt = `${context}\nUser Question: ${question}`;

    const result = await model.generateContent([{ text: prompt }]);
    const answer = result.response.text();

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


