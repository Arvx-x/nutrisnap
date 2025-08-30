import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export type Meal = {
  id: string;
  name: string;
  calories: number;
  summary: string;
  image: string;
};

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <Link href={`/meals/${meal.id}`} className="block active:scale-[0.99]">
      <Card className="overflow-hidden">
        <div className="relative h-40 w-full bg-[var(--peach)]/40">
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        <CardContent>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-black">{meal.name}</h3>
              <p className="mt-1 text-xs text-black/70">{meal.summary}</p>
            </div>
            <span className="shrink-0 rounded-xl bg-[var(--soft-yellow)] px-2 py-1 text-[11px] font-medium text-black/80">
              {meal.calories} kcal
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}


