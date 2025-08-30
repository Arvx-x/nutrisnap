import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-static";

export default function ProfilePage() {
  return (
    <main className="px-5 pt-6 pb-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold">Profile</h1>
      <p className="mt-1 text-sm text-black/70">Your basic info and preferences</p>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Aarav B.</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-[var(--soft-yellow)] p-3">
              <div className="text-xs text-black/60">Age</div>
              <div className="mt-1 text-sm font-semibold">28</div>
            </div>
            <div className="rounded-xl bg-[var(--sage)]/50 p-3">
              <div className="text-xs text-black/60">Goal</div>
              <div className="mt-1 text-sm font-semibold">Lean Bulk</div>
            </div>
            <div className="rounded-xl bg-[var(--peach)]/50 p-3">
              <div className="text-xs text-black/60">Activity</div>
              <div className="mt-1 text-sm font-semibold">Moderate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
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


