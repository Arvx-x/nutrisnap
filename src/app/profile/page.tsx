import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-static";

export default function ProfilePage() {
  const weightKg = 72;
  const heightCm = 175;
  const bmi = Math.round((weightKg / Math.pow(heightCm / 100, 2)) * 10) / 10;
  return (
    <main className="px-5 pt-6 pb-6 max-w-md mx-auto">
      <h1 className="text-2xl font-extrabold tracking-tight font-display">Profile</h1>
      <p className="mt-1 text-sm text-black/70">Your basic info and preferences</p>

      <Card className="mt-5 relative rounded-xl border-[3px] border-black bg-white shadow-[6px_6px_0_0_#111]">
        {/* Halftone background */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] rounded-xl"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '6px 6px',
          }}
        />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 rounded-full bg-[var(--soft-yellow)] border-[3px] border-black shadow-[4px_4px_0_0_#111] grid place-items-center">
                <span className="text-lg font-extrabold">AB</span>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-white border-[2px] border-black rounded-full grid place-items-center shadow-[2px_2px_0_0_#111] text-[10px]">⭐</span>
              </div>
              <CardTitle className="font-extrabold">Aarav B.</CardTitle>
            </div>
            <span className="inline-block bg-yellow-200 border-[2px] border-black rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow-[3px_3px_0_0_#111]">Profile</span>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-[var(--soft-yellow)] p-3 border-[2px] border-black shadow-[3px_3px_0_0_#111]">
              <div className="text-xs text-black/60">Age</div>
              <div className="mt-1 text-sm font-semibold">28</div>
            </div>
            <div className="rounded-xl bg-[var(--sage)]/50 p-3 border-[2px] border-black shadow-[3px_3px_0_0_#111]">
              <div className="text-xs text-black/60">Goal</div>
              <div className="mt-1 text-sm font-semibold">Lean Bulk</div>
            </div>
            <div className="rounded-xl bg-[var(--peach)]/50 p-3 border-[2px] border-black shadow-[3px_3px_0_0_#111]">
              <div className="text-xs text-black/60">Activity</div>
              <div className="mt-1 text-sm font-semibold">Moderate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 relative rounded-xl border-[3px] border-black bg-white shadow-[6px_6px_0_0_#111]">
        {/* Halftone background */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] rounded-xl"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '6px 6px',
          }}
        />
        <CardHeader className="relative z-10 flex items-center justify-between">
          <CardTitle className="font-extrabold">Body Metrics</CardTitle>
          <span className="inline-block bg-white border-[2px] border-black rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow-[3px_3px_0_0_#111]">Health</span>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-[var(--soft-yellow)] p-3 border-[2px] border-black shadow-[3px_3px_0_0_#111]">
              <div className="text-xs text-black/60">Weight</div>
              <div className="mt-1 text-sm font-semibold">{weightKg} kg</div>
            </div>
            <div className="rounded-xl bg-[var(--sage)]/50 p-3 border-[2px] border-black shadow-[3px_3px_0_0_#111]">
              <div className="text-xs text-black/60">Height</div>
              <div className="mt-1 text-sm font-semibold">{heightCm} cm</div>
            </div>
            <div className="rounded-xl bg-[var(--peach)]/50 p-3 border-[2px] border-black shadow-[3px_3px_0_0_#111]">
              <div className="text-xs text-black/60">BMI</div>
              <div className="mt-1 text-sm font-semibold">{bmi}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 relative rounded-xl border-[3px] border-black bg-white shadow-[6px_6px_0_0_#111]">
        {/* Halftone background */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] rounded-xl"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '6px 6px',
          }}
        />
        <CardHeader className="relative z-10 flex items-center justify-between">
          <CardTitle className="font-extrabold">Preferences</CardTitle>
          <span className="inline-block bg-white border-[2px] border-black rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow-[3px_3px_0_0_#111]">Likes</span>
        </CardHeader>
        <CardContent className="relative z-10">
          <ul className="list-disc list-inside text-sm text-black/80 space-y-1">
            <li>High-protein meals</li>
            <li>Low added sugar</li>
            <li>Prefers salmon, chicken, and seasonal veggies</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}


