'use client';

import { useEffect, useMemo, useState } from 'react';

type Meal = {
  calories?: number;
  protein?: number;
  carbs?: number;
};

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function loadMeals(dateKey: string): Meal[] {
  try {
    const raw = localStorage.getItem(`meals:${dateKey}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Meal[];
  } catch {}
  return [];
}

export default function TodayProgressWheels() {
  const [totals, setTotals] = useState<{ calories: number; protein: number; carbs: number }>({ calories: 0, protein: 0, carbs: 0 });

  const targetCalories = 900;
  const targetProtein = 80;
  const targetCarbs = 120;

  useEffect(() => {
    const key = getDateKey(new Date());
    const meals = loadMeals(key);
    const sum = meals.reduce(
      (acc, m) => {
        acc.calories += m.calories || 0;
        acc.protein += m.protein || 0;
        acc.carbs += m.carbs || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0 }
    );
    setTotals(sum);
  }, []);

  const { caloriesDeg, proteinDeg, carbsDeg } = useMemo(() => {
    const caloriesPct = Math.max(0, Math.min(100, Math.round((totals.calories / targetCalories) * 100)));
    const proteinPct = Math.max(0, Math.min(100, Math.round((totals.protein / targetProtein) * 100)));
    const carbsPct = Math.max(0, Math.min(100, Math.round((totals.carbs / targetCarbs) * 100)));
    return {
      caloriesDeg: caloriesPct * 3.6,
      proteinDeg: proteinPct * 3.6,
      carbsDeg: carbsPct * 3.6,
    };
  }, [totals.calories, totals.protein, totals.carbs]);

  return (
    <div className="mt-3 grid grid-cols-3 gap-3">
      <div className="flex flex-col items-center">
        <div
          className="relative h-20 w-20 rounded-full border-2 border-black shadow-[3px_3px_0_0_#111]"
          style={{ background: `conic-gradient(color-mix(in srgb, var(--soft-yellow), black 12%) ${caloriesDeg}deg, #f3f4f6 ${caloriesDeg}deg 360deg)` }}
          aria-label="Calories progress"
        >
          <div className="absolute inset-[8px] rounded-full bg-white grid place-items-center text-[17px] font-extrabold">
            {totals.calories}
            <span className="text-[14px] font-semibold"> kcal</span>
          </div>
        </div>
        <span className="mt-1 text-[11px] font-bold uppercase tracking-wide">Calories</span>
      </div>

      <div className="flex flex-col items-center">
        <div
          className="relative h-20 w-20 rounded-full border-2 border-black shadow-[3px_3px_0_0_#111]"
          style={{ background: `conic-gradient(color-mix(in srgb, var(--sage), black 12%) ${proteinDeg}deg, #f3f4f6 ${proteinDeg}deg 360deg)` }}
          aria-label="Protein progress"
        >
          <div className="absolute inset-[8px] rounded-full bg-white grid place-items-center text-[17px] font-extrabold text-[#1f3b2f]">
            {totals.protein}
            <span className="text-[14px] font-semibold"> g</span>
          </div>
        </div>
        <span className="mt-1 text-[11px] font-bold uppercase tracking-wide">Protein</span>
      </div>

      <div className="flex flex-col items-center">
        <div
          className="relative h-20 w-20 rounded-full border-2 border-black shadow-[3px_3px_0_0_#111]"
          style={{ background: `conic-gradient(color-mix(in srgb, var(--peach), black 12%) ${carbsDeg}deg, #f3f4f6 ${carbsDeg}deg 360deg)` }}
          aria-label="Carbs progress"
        >
          <div className="absolute inset-[8px] rounded-full bg-white grid place-items-center text-[17px] font-extrabold">
            {totals.carbs}
            <span className="text-[14px] font-semibold"> g</span>
          </div>
        </div>
        <span className="mt-1 text-[11px] font-bold uppercase tracking-wide">Carbs</span>
      </div>
    </div>
  );
}


