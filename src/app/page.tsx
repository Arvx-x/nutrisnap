import Link from "next/link";
import UploadAnalyzer from "@/components/UploadAnalyzer";

export default function Home() {
  return (
    <main className="px-5 pt-8 pb-6 max-w-md mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--soft-yellow)] shadow-soft">
          <span className="text-2xl">🥗</span>
        </div>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tighter">
          <span className="inline-block bg-[var(--peach)] px-2 pb-1 rounded-md border-2 border-black shadow-[4px_4px_0_0_#111]">Nutri</span>
          <span className="ml-1 inline-block bg-[var(--sage)] px-2 pb-1 rounded-md border-2 border-black shadow-[4px_4px_0_0_#111]">Scan</span>
        </h1>
        <p className="mt-2 text-sm text-black/70 font-semibold uppercase tracking-wide">Smart AI Nutrition Guide</p>
      </div>

      <div className="mt-6 grid gap-3">
        <div className="rounded-2xl p-4 bg-[var(--peach)]/60 border-2 border-black shadow-[6px_6px_0_0_#111]">
          <div className="text-[12px] font-extrabold uppercase tracking-tight text-black/80">Feature</div>
          <div className="mt-1 text-sm">Comic-style meal cards with quick nutrition badges</div>
        </div>
        <div className="rounded-2xl p-4 bg-[var(--soft-yellow)]/80 border-2 border-black shadow-[6px_6px_0_0_#111]">
          <div className="text-[12px] font-extrabold uppercase tracking-tight text-black/80">Feature</div>
          <div className="mt-1 text-sm">Personalized insights and weekly progress</div>
        </div>
        <div className="rounded-2xl p-4 bg-[var(--sage)]/60 border-2 border-black shadow-[6px_6px_0_0_#111]">
          <div className="text-[12px] font-extrabold uppercase tracking-tight text-black/80">Feature</div>
          <div className="mt-1 text-sm">Mobile-first design with playful visuals</div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/meals"
          className="block w-full text-center rounded-2xl py-3 bg-[var(--sage)] text-[#1f3b2f] font-extrabold uppercase tracking-wide border-2 border-black shadow-[6px_6px_0_0_#111] active:translate-y-[2px]"
        >
          Browse Top Meals
        </Link>
      </div>

      <UploadAnalyzer />
    </main>
  );
}
