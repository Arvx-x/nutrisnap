import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { meals } from "@/data/meals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AskAI from "@/components/AskAI";

export async function generateStaticParams() {
  return meals.map((m) => ({ id: m.id }));
}

export default function MealDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const meal = meals.find((m) => m.id === id);
  if (!meal) return notFound();

  return (
    <main className="px-5 pt-6 pb-6 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <Link
          href="/meals"
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide bg-white border-2 border-black shadow-[3px_3px_0_0_#111]"
          aria-label="Back to Top Meals"
        >
          ← Back
        </Link>
        <span className="text-xs text-black/60">Details</span>
      </div>
      <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-[var(--peach)]/40 shadow-soft">
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      <h1 className="mt-4 text-xl font-semibold">{meal.name}</h1>
      <p className="mt-1 text-sm text-black/70">{meal.summary}</p>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Nutrition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-[var(--soft-yellow)] p-3">
              <div className="text-xs text-black/60">Calories</div>
              <div className="mt-1 text-sm font-semibold">{meal.calories}</div>
            </div>
            <div className="rounded-xl bg-[var(--sage)]/50 p-3">
              <div className="text-xs text-black/60">Protein</div>
              <div className="mt-1 text-sm font-semibold">{meal.protein}</div>
            </div>
            <div className="rounded-xl bg-[var(--peach)]/50 p-3">
              <div className="text-xs text-black/60">Carbs</div>
              <div className="mt-1 text-sm font-semibold">{meal.carbs}</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-white p-3 border border-black/5">
              <div className="text-xs text-black/60">Fat</div>
              <div className="mt-1 text-sm font-semibold">{meal.fat}</div>
            </div>
            <div className="rounded-xl bg-white p-3 border border-black/5 col-span-2 text-left">
              <div className="text-xs text-black/60">About</div>
              <div className="mt-1 text-sm">{meal.description}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Suggested Recipes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-black/80 space-y-1">
            <li>Herbed Quinoa with Lemon Zest</li>
            <li>Roasted Veggie Medley</li>
            <li>Light Yogurt Dill Sauce</li>
          </ul>
        </CardContent>
      </Card>

      {/* Ask AI inside meal card on tap; placed at bottom of details */}
      <AskAI meal={meal} />
    </main>
  );
}


