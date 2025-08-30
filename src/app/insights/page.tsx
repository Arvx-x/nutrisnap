import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { insights, weeklyProgress } from "@/data/insights";
import ScorePieChart, { ScoreData } from "@/data/nutri-snap-score";

export const dynamic = "force-static";

export default function InsightsPage() {
  // Temporary demo data for Nutri Snap Score distribution
  const nowSeconds = Math.floor(Date.now() / 1000);
  const scoreData: ScoreData[] = [82, 71, 64, 53, 47, 39, 26, 15, 92, 78, 58, 34].map((score, i) => ({
    score,
    date: { seconds: nowSeconds - i * 86400, nanoseconds: 0 },
  }));

  return (
    <main className="px-5 pt-6 pb-6 max-w-md mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight font-display">Insights</h1>
          <p className="mt-1 text-sm text-black/70">Your weekly nutrition highlights</p>
        </div>
        <span className="inline-block bg-yellow-200 border-[2px] border-black rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-[3px_3px_0_0_#111]">
          Week
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        <Card className="relative rounded-xl border-[3px] border-black bg-white shadow-[6px_6px_0_0_#111]">
          <CardHeader>
            <CardTitle>Weekly Goal Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-3 w-full rounded-full bg-black/10 overflow-hidden">
              <div
                className="h-full bg-[var(--sage)]"
                style={{ width: `${weeklyProgress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-black/60">{weeklyProgress}% complete</div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-lg sm:text-xl font-extrabold tracking-tight font-display">Nutri Score</h4>
                <div className="relative">
                  <details className="group relative">
                    <summary aria-label="How is the score calculated?" className="list-none cursor-pointer inline-flex items-center justify-center w-7 h-7 rounded-full bg-white border-[2px] border-black shadow-[2px_2px_0_0_#111] text-sm font-extrabold select-none">?</summary>
                    <div className="absolute right-0 mt-2 w-64 bg-white border-[3px] border-black rounded-xl shadow-[6px_6px_0_0_#111] p-3 z-20">
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-xl"
                        style={{
                          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
                          backgroundSize: '6px 6px',
                          maskImage: 'radial-gradient(circle at center, black 80%, transparent 100%)',
                          WebkitMaskImage: 'radial-gradient(circle at center, black 80%, transparent 100%)',
                        }}
                      />
                      <p className="relative z-10 text-xs text-black/80 leading-relaxed">
                        Your Nutri Score is an average of recent meal scores (0–100),
                        factoring calorie goal adherence, macro balance, and protein/fiber density.
                      </p>
                      <span className="absolute -top-2 right-6 w-3 h-3 bg-white border-t-[3px] border-l-[3px] border-black rotate-45" />
                    </div>
                  </details>
                </div>
              </div>
              {/* Chart renders only on client */}
              <ScorePieChart data={scoreData} />
            </div>
          </CardContent>
        </Card>

        {insights.map((item) => (
          <Card
            key={item.id}
            className="relative rounded-xl border-[3px] border-black bg-white shadow-[6px_6px_0_0_#111]"
          >
            <CardContent className="flex items-center gap-3">
              <span className="text-xl">✨</span>
              <p className="text-sm text-black/80">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}


