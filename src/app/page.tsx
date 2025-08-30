import Link from "next/link";

export default function Home() {
  return (
    <main className="px-5 pt-8 pb-6 max-w-md mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--soft-yellow)] shadow-soft">
          <span className="text-2xl">🥗</span>
        </div>
        <h1 className="mt-5 text-2xl font-semibold">NutriScan</h1>
        <p className="mt-2 text-sm text-black/70">Smart AI Nutrition Guide</p>
      </div>

      <div className="mt-8 rounded-2xl p-5 bg-[var(--peach)]/50 shadow-soft">
        <p className="text-sm leading-relaxed text-black/75">
          Explore delicious meals with clear nutrition facts. Get insights and stay on track with your goals.
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/meals"
          className="block w-full text-center rounded-2xl py-3 bg-[var(--sage)] text-[#1f3b2f] font-medium shadow-soft-lg active:scale-[0.99]"
        >
          Browse Top Meals
        </Link>
      </div>
    </main>
  );
}
