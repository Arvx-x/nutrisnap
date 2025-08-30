import prisma from "../../../../../lib/prisma";

type PatchBody = {
  name?: string;
  weightKg?: number;
  heightCm?: number;
  bmi?: number;
  dietaryPreferences?: string[];
  goals?: string[];
  // `activity` is not in the Prisma model; ignore if provided
  activity?: unknown;
};

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  try {
    const idNum = Number(id);
    if (!Number.isInteger(idNum) || idNum <= 0) {
      return new Response(JSON.stringify({ error: "Invalid user id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as PatchBody | undefined;
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ error: "Missing request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data: Record<string, unknown> = {};

    if (typeof body.name === "string") data.name = body.name;
    if (typeof body.weightKg === "number") data.weightKg = body.weightKg;
    if (typeof body.heightCm === "number") data.heightCm = body.heightCm;
    if (typeof body.bmi === "number") data.bmi = body.bmi;
    if (
      Array.isArray(body.dietaryPreferences) &&
      body.dietaryPreferences.every((v) => typeof v === "string")
    )
      data.dietaryPreferences = body.dietaryPreferences;
    if (Array.isArray(body.goals) && body.goals.every((v) => typeof v === "string"))
      data.goals = body.goals;

    if (Object.keys(data).length === 0) {
      return new Response(JSON.stringify({ error: "No valid fields to update" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updated = await prisma.user.update({ where: { id: idNum }, data });

    return new Response(JSON.stringify({ user: updated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (
      typeof message === "string" &&
      (message.includes("Record to update not found") || message.includes("P2025"))
    ) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


