import MealCard from "@/components/MealCard";
import { meals } from "@/data/meals";

export const dynamic = "force-static";

export default function MealsPage() {
  return (
    <main className="px-5 pt-6 pb-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold">Top Meals</h1>
      <p className="mt-1 text-sm text-black/70">Handpicked favorites for you</p>

      <div className="mt-5 grid gap-4">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </main>
  );
}


