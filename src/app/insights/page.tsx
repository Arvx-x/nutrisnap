import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { insights, weeklyProgress } from "@/data/insights";

export const dynamic = "force-static";

export default function InsightsPage() {
  return (
    <main className="px-5 pt-6 pb-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold">Insights</h1>
      <p className="mt-1 text-sm text-black/70">Your weekly nutrition highlights</p>

      <div className="mt-5 grid gap-4">
        {insights.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center gap-3">
              <span className="text-xl">✨</span>
              <p className="text-sm text-black/80">{item.text}</p>
            </CardContent>
          </Card>
        ))}

        <Card>
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
          </CardContent>
        </Card>
      </div>
    </main>
  );
}


