import Link from "next/link";
import UploadAnalyzer from "@/components/UploadAnalyzer";
import { meals } from "@/data/meals";
import SafeImage from "@/components/SafeImage";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../lib/prisma";
import TodayProgressWheels from "@/components/TodayProgressWheels";

export const dynamic = "force-dynamic";

export default async function Home() {
  // progress wheels are computed client-side from localStorage

  const today = new Date();
  const dateStr = today.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // angles and totals are computed in TodayProgressWheels

  const onboardingHref = "/insights";
  const onboardingLabel = "Insights";

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
          <TodayProgressWheels />

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href="/meals" className="text-center rounded-2xl py-3 bg-[var(--sage)] text-[#1f3b2f] font-extrabold uppercase tracking-wide border-2 border-black shadow-[6px_6px_0_0_#111] active:translate-y-[2px]">My Meals</Link>
            <Link href={onboardingHref} className="text-center rounded-2xl py-3 bg-white font-extrabold uppercase tracking-wide border-2 border-black shadow-[6px_6px_0_0_#111] active:translate-y-[2px]">{onboardingLabel}</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-6 grid gap-3">
        <div className="rounded-2xl p-4 bg-[var(--peach)]/60 border-2 border-black shadow-[6px_6px_0_0_#111]">
          <div className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-tight text-black/80"><span>🏃</span><span>Suggested activity</span></div>
          <div className="mt-1 text-sm">Try a 20‑min brisk walk after lunch to boost energy and digestion.</div>
        </div>
        <div className="rounded-2xl p-4 bg-[var(--soft-yellow)]/80 border-2 border-black shadow-[6px_6px_0_0_#111]">
          <div className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-tight text-black/80"><span>💊</span><span>Medicine reminder</span></div>
          <div className="mt-1 text-sm">Take your prescribed meds with water after dinner. Consider setting a daily alarm.</div>
        </div>
        <div className="rounded-2xl p-4 bg-[var(--sage)]/60 border-2 border-black shadow-[6px_6px_0_0_#111]">
          <div className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-tight text-black/80"><span>🍊</span><span>Seasonal pick</span></div>
          <div className="mt-1 text-sm">Include citrus fruits (orange, sweet lime) this week to support immunity during weather changes.</div>
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
