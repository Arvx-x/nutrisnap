import Link from "next/link";
import UploadAnalyzer from "@/components/UploadAnalyzer";
import { meals } from "@/data/meals";
import SafeImage from "@/components/SafeImage";

export default function Home() {
  const sampleCalories = 420;
  const sampleProtein = 38; // grams
  const sampleCarbs = 36; // grams

  const today = new Date();
  const dateStr = today.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const caloriesPct = Math.max(0, Math.min(100, Math.round((sampleCalories / 900) * 100)));
  const proteinPct = Math.max(0, Math.min(100, Math.round((sampleProtein / 80) * 100)));
  const carbsPct = Math.max(0, Math.min(100, Math.round((sampleCarbs / 120) * 100)));

  const caloriesDeg = caloriesPct * 3.6;
  const proteinDeg = proteinPct * 3.6;
  const carbsDeg = carbsPct * 3.6;

  return (
    <main className="px-5 pt-6 pb-6 max-w-md mx-auto">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-black bg-[var(--soft-yellow)]/70 shadow-[8px_8px_0_0_#111] p-5">
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--peach)]/50"
        />
        <div
          aria-hidden
          className="absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-[var(--sage)]/50"
        />
        <div className="relative">
          <h1 className="mt-3 text-3xl font-extrabold tracking-tighter font-display flex items-center gap-2 whitespace-nowrap">
            <span
              className="inline-block px-3 py-1 rounded-md border-2 border-black shadow-[4px_4px_0_0_#111] bg-[var(--peach)]"
            >
              NutriSnap
            </span>
          </h1>
          <div className="inline-flex flex-col gap-2 mt-3">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-white/80 border border-black shadow-[3px_3px_0_0_#111]">
              <span className="text-xs font-extrabold uppercase tracking-wide">Hey Aarav</span>
              <span className="text-xs">👋</span>
            </div>
            <div className="inline-block text-[11px] font-semibold text-black bg-white/80 px-2 py-0.5 rounded-md border border-black/10">
              {dateStr}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center">
              <div
                className="relative h-20 w-20 rounded-full border-2 border-black shadow-[3px_3px_0_0_#111]"
                style={{ background: `conic-gradient(color-mix(in srgb, var(--soft-yellow), black 12%) ${caloriesDeg}deg, #f3f4f6 ${caloriesDeg}deg 360deg)` }}
                aria-label="Calories progress"
              >
                <div className="absolute inset-[8px] rounded-full bg-white grid place-items-center text-[17px] font-extrabold">
                  {sampleCalories}
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
                  {sampleProtein}
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
                  {sampleCarbs}
                  <span className="text-[14px] font-semibold"> g</span>
                </div>
              </div>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-wide">Carbs</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href="/meals" className="text-center rounded-2xl py-3 bg-[var(--sage)] text-[#1f3b2f] font-extrabold uppercase tracking-wide border-2 border-black shadow-[6px_6px_0_0_#111] active:translate-y-[2px]">Meals</Link>
            <Link href="/insights" className="text-center rounded-2xl py-3 bg-white font-extrabold uppercase tracking-wide border-2 border-black shadow-[6px_6px_0_0_#111] active:translate-y-[2px]">Insights</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-6 grid gap-3">
        <div className="rounded-2xl p-4 bg-[var(--peach)]/60 border-2 border-black shadow-[6px_6px_0_0_#111]">
          <div className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-tight text-black/80"><span>🍽️</span><span>Comic meal cards</span></div>
          <div className="mt-1 text-sm">Quick nutrition badges and fun visuals</div>
        </div>
        <div className="rounded-2xl p-4 bg-[var(--soft-yellow)]/80 border-2 border-black shadow-[6px_6px_0_0_#111]">
          <div className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-tight text-black/80"><span>📈</span><span>Personal insights</span></div>
          <div className="mt-1 text-sm">Weekly progress and helpful tips</div>
        </div>
        <div className="rounded-2xl p-4 bg-[var(--sage)]/60 border-2 border-black shadow-[6px_6px_0_0_#111]">
          <div className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-tight text-black/80"><span>⚡</span><span>Fast & mobile</span></div>
          <div className="mt-1 text-sm">Smooth, responsive, and accessible</div>
        </div>
      </section>

      {/* Quick Picks */}
      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold tracking-tight">Quick Picks</h2>
          <Link href="/meals" className="text-xs underline">See all</Link>
        </div>
        <div className="mt-3 grid gap-3">
          {meals.slice(0, 2).map((meal) => (
            <Link key={meal.id} href={`/meals/${meal.id}`} className="flex items-center gap-3 rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_0_#111] p-2 active:translate-y-[1px]">
              <SafeImage src={meal.image} alt={meal.name} className="h-16 w-16 rounded-xl object-cover border border-black/10" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{meal.name}</div>
                <div className="text-[11px] text-black/70">{meal.summary}</div>
              </div>
              <span className="tag-comic bg-[var(--soft-yellow)] px-2 py-1 text-[11px] font-bold">{meal.calories} kcal</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Upload and Analyze */}
      <UploadAnalyzer />
    </main>
  );
}
