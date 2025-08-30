'use client';

import { useEffect, useMemo, useState } from "react";

type Meal = {
  id: string;
  name: string;
  mealType?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  imageDataUrl?: string; // stored as data URL in localStorage
  createdAt: string; // ISO string
};

const PRESET_DISHES: Array<{
  key: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}> = [
  { key: "grilled-chicken-salad", name: "Grilled Chicken Salad", calories: 420, protein: 35, carbs: 20, fat: 20 },
  { key: "paneer-tikka-bowl", name: "Paneer Tikka Bowl", calories: 480, protein: 28, carbs: 32, fat: 24 },
  { key: "veggie-omelette", name: "Veggie Omelette", calories: 300, protein: 20, carbs: 6, fat: 20 },
  { key: "peanut-butter-toast", name: "Peanut Butter Toast", calories: 320, protein: 12, carbs: 28, fat: 18 },
  { key: "masala-oats", name: "Masala Oats", calories: 350, protein: 12, carbs: 52, fat: 10 },
  { key: "dal-rice", name: "Dal Rice", calories: 520, protein: 18, carbs: 86, fat: 8 },
  { key: "rajma-chawal", name: "Rajma Chawal", calories: 560, protein: 20, carbs: 92, fat: 8 },
  { key: "banana", name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
  { key: "apple", name: "Apple", calories: 95, protein: 0, carbs: 25, fat: 0 },
  { key: "oats-berries", name: "Oats with Berries", calories: 380, protein: 14, carbs: 60, fat: 8 },
  { key: "greek-yogurt-parfait", name: "Greek Yogurt Parfait", calories: 320, protein: 18, carbs: 38, fat: 10 },
  { key: "tofu-stir-fry", name: "Tofu Stir-fry", calories: 420, protein: 26, carbs: 30, fat: 20 },
  { key: "chickpea-salad", name: "Chickpea Salad", calories: 360, protein: 16, carbs: 40, fat: 12 },
  { key: "sprout-salad", name: "Sprout Salad", calories: 300, protein: 18, carbs: 40, fat: 6 },
  { key: "mixed-nuts", name: "Mixed Nuts (30g)", calories: 180, protein: 6, carbs: 6, fat: 15 },
  { key: "smoothie-bowl", name: "Smoothie Bowl", calories: 380, protein: 12, carbs: 58, fat: 10 },
  { key: "dal-khichdi", name: "Dal Khichdi", calories: 480, protein: 16, carbs: 86, fat: 8 },
  { key: "vegetable-upma", name: "Vegetable Upma", calories: 350, protein: 8, carbs: 60, fat: 10 },
  { key: "poha", name: "Poha", calories: 320, protein: 6, carbs: 60, fat: 8 },
  { key: "idli-sambar", name: "Idli with Sambar", calories: 300, protein: 10, carbs: 56, fat: 4 },
  { key: "dosa-chutney", name: "Dosa with Chutney", calories: 420, protein: 8, carbs: 60, fat: 16 },
  { key: "chapati-sabzi", name: "Chapati with Sabzi", calories: 420, protein: 10, carbs: 70, fat: 10 },
  { key: "grilled-fish-quinoa", name: "Grilled Fish with Quinoa", calories: 520, protein: 35, carbs: 40, fat: 22 },
  { key: "paneer-salad", name: "Grilled Paneer Salad", calories: 380, protein: 24, carbs: 16, fat: 22 },
  { key: "egg-bhurji", name: "Egg Bhurji", calories: 300, protein: 18, carbs: 6, fat: 22 },
  { key: "curd-rice", name: "Curd Rice", calories: 420, protein: 12, carbs: 72, fat: 10 },
  { key: "avocado-toast", name: "Avocado Toast", calories: 340, protein: 8, carbs: 36, fat: 18 },
  { key: "hummus-veggies", name: "Hummus with Veggies", calories: 280, protein: 10, carbs: 30, fat: 12 },
  { key: "fruit-salad", name: "Fruit Salad", calories: 220, protein: 3, carbs: 54, fat: 1 },
  { key: "chia-pudding", name: "Chia Pudding", calories: 300, protein: 10, carbs: 32, fat: 14 },
];

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
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

function saveMeals(dateKey: string, meals: Meal[]) {
  try {
    localStorage.setItem(`meals:${dateKey}`, JSON.stringify(meals));
  } catch {}
}

export default function MealsPage() {
  const [dateKey, setDateKey] = useState<string>(getDateKey(new Date()));
  const [meals, setMeals] = useState<Meal[]>([]);

  const [name, setName] = useState("");
  const [mealType, setMealType] = useState<string>("");
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>("");
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMeals(loadMeals(dateKey));
  }, [dateKey]);

  const totals = useMemo(() => {
    const sum = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    for (const m of meals) {
      sum.calories += m.calories || 0;
      sum.protein += m.protein || 0;
      sum.carbs += m.carbs || 0;
      sum.fat += m.fat || 0;
    }
    return sum;
  }, [meals]);

  function onSelectImage(file?: File) {
    if (!file) {
      setImageDataUrl(undefined);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(typeof reader.result === "string" ? reader.result : undefined);
    };
    reader.readAsDataURL(file);
  }

  function addMeal() {
    const preset = PRESET_DISHES.find((p) => p.key === selectedPresetKey) || null;
    const meal: Meal = {
      id: Math.random().toString(36).slice(2),
      name: name.trim() || preset?.name || "Untitled Meal",
      mealType: mealType || undefined,
      calories: preset?.calories,
      protein: preset?.protein,
      carbs: preset?.carbs,
      fat: preset?.fat,
      imageDataUrl,
      createdAt: new Date().toISOString(),
    };
    const next = [meal, ...meals];
    setMeals(next);
    saveMeals(dateKey, next);

    // reset form
    setName("");
    setMealType("");
    setSelectedPresetKey("");
    setImageDataUrl(undefined);
  }

  function removeMeal(id: string) {
    const next = meals.filter((m) => m.id !== id);
    setMeals(next);
    saveMeals(dateKey, next);
  }

  return (
    <main className="px-5 pt-6 pb-8 max-w-md mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-extrabold tracking-tight">Your Meals</h1>
        <p className="text-sm text-black/70">Add meals manually and keep track for the day</p>
      </header>

      <section className="rounded-2xl border-2 border-black bg-[var(--soft-yellow)]/60 p-4 shadow-[8px_8px_0_0_#111]">
        <div className="grid gap-3">
          <div>
            <label className="block text-sm font-semibold">Meal name</label>
            <input
              className="mt-1 w-full rounded-xl border-2 border-black px-3 py-2 shadow-[4px_4px_0_0_#111]"
              placeholder="e.g., Grilled chicken salad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold">Meal type</label>
              <select
                className="mt-1 w-full rounded-xl border-2 border-black px-3 py-2 shadow-[4px_4px_0_0_#111] bg-white"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="">Select type</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Snack">Snack</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
          </div>

          

          <div>
            <label className="block text-sm font-semibold">Quick add from list</label>
            <select
              className="mt-1 w-full rounded-xl border-2 border-black px-3 py-2 shadow-[4px_4px_0_0_#111] bg-white"
              value={selectedPresetKey}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedPresetKey(value);
                if (value && !name) {
                  const preset = PRESET_DISHES.find((p) => p.key === value);
                  if (preset) setName(preset.name);
                }
              }}
            >
              <option value="">Select a dish (optional)</option>
              {PRESET_DISHES.map((p) => (
                <option key={p.key} value={p.key}>{p.name} — {p.calories} kcal • {p.protein}g P</option>
              ))}
            </select>
            {selectedPresetKey && (
              <div className="mt-1 text-[11px] text-black/70">Selected dish macros will be saved automatically.</div>
            )}
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={addMeal}
              className="rounded-full bg-white border-2 border-black px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#111] active:translate-y-[1px]"
            >
              Add meal
            </button>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold tracking-tight">Today&apos;s meals</h2>
          <span className="text-xs rounded-full px-2 py-0.5 bg-white border-2 border-black shadow-[3px_3px_0_0_#111] font-extrabold">{meals.length}</span>
        </div>

        <div className="mt-3 grid gap-3">
          {meals.map((m) => (
            <div key={m.id} className="flex items-center gap-3 rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_0_#111] p-2">
              {m.imageDataUrl ? (
                <img src={m.imageDataUrl} alt={m.name} className="h-16 w-16 rounded-xl object-cover border border-black/10" />
              ) : (
                <div className="h-16 w-16 rounded-xl bg-[var(--soft-yellow)] grid place-items-center text-xs font-extrabold border border-black/10">No Image</div>
              )}
              <div className="flex-1">
                <div className="text-sm font-semibold">{m.name}</div>
                <div className="text-[11px] text-black/70">
                  {m.mealType ? `${m.mealType} • ` : ""}
                  {m.calories ? `${m.calories} kcal` : "—"}
                  {m.protein ? ` • ${m.protein} g protein` : ""}
                  {m.carbs ? ` • ${m.carbs} g carbs` : ""}
                  {m.fat ? ` • ${m.fat} g fat` : ""}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeMeal(m.id)}
                className="text-[11px] rounded-full px-2 py-1 bg-[var(--peach)] border-2 border-black font-extrabold shadow-[3px_3px_0_0_#111] active:translate-y-[1px]"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-2xl p-3 bg-white border-2 border-black shadow-[6px_6px_0_0_#111] text-sm">
          <div className="font-extrabold uppercase tracking-wide text-xs mb-1">Daily totals</div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-[11px] text-black/60">Cal</div>
              <div className="text-sm font-semibold">{totals.calories}</div>
            </div>
            <div>
              <div className="text-[11px] text-black/60">Protein</div>
              <div className="text-sm font-semibold">{totals.protein} g</div>
            </div>
            <div>
              <div className="text-[11px] text-black/60">Carbs</div>
              <div className="text-sm font-semibold">{totals.carbs} g</div>
            </div>
            <div>
              <div className="text-[11px] text-black/60">Fat</div>
              <div className="text-sm font-semibold">{totals.fat} g</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
