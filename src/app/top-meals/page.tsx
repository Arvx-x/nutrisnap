import Link from "next/link";
import MealCard from "@/components/MealCard";
import { meals } from "@/data/meals";

export const dynamic = "force-static";

export default function TopMealsPage() {
  return (
    <main className="px-5 pt-6 pb-6 max-w-md mx-auto">
      <h1 className="text-2xl font-extrabold tracking-tight font-display">Top Meals</h1>
      <p className="mt-1 text-sm text-black/70">Handpicked favorites for you</p>

      <div className="mt-5 grid gap-4">
        {meals.map((meal) => (
          <Link key={meal.id} href={`/meals/${meal.id}`} className="block">
            <MealCard
              imageUrl={meal.image}
              title={meal.name}
              summary={meal.description}
              tag={meal.summary.split("•")[1]?.trim()}
              footer={`${meal.calories} kcal`}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}


