'use client';

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StepOne from "@/components/onboarding/StepOne";
import StepTwo from "@/components/onboarding/StepTwo";
import StepThree from "@/components/onboarding/StepThree";

export const dynamic = "force-static";

type ProfileData = {
  name: string;
  weightKg: number | "";
  heightCm: number | "";
  activityLevel: string;
  goals: string[];
};

function computeBmi(weightKg: number | "", heightCm: number | "") {
  if (typeof weightKg !== "number" || typeof heightCm !== "number" || heightCm === 0) return undefined;
  const bmiRaw = weightKg / Math.pow(heightCm / 100, 2);
  return Math.round(bmiRaw * 10) / 10;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ProfileData>({
    name: "",
    weightKg: "",
    heightCm: "",
    activityLevel: "",
    goals: [],
  });

  const bmi = useMemo(() => computeBmi(form.weightKg, form.heightCm), [form.weightKg, form.heightCm]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("profile");
      if (raw) {
        const parsed = JSON.parse(raw) as ProfileData;
        setProfile(parsed);
        setForm(parsed);
      }
    } catch {}
  }, []);

  function update<K extends keyof ProfileData>(key: K, value: ProfileData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function openWizard() {
    setStep(1);
    setForm(
      profile ?? {
        name: "",
        weightKg: "",
        heightCm: "",
        activityLevel: "",
        goals: [],
      }
    );
    setShowWizard(true);
  }

  function saveProfile() {
    try {
      localStorage.setItem("profile", JSON.stringify(form));
      setProfile(form);
      setShowWizard(false);
      alert("Profile saved!");
    } catch {
      alert("Failed to save profile locally");
    }
  }

  function signOut() {
    try {
      localStorage.removeItem("profile");
    } catch {}
    setProfile(null);
    setForm({ name: "", weightKg: "", heightCm: "", activityLevel: "", goals: [] });
    setShowWizard(false);
    alert("Signed out");
  }

  return (
    <main className="px-5 pt-6 pb-6 max-w-md mx-auto">
      <h1 className="text-2xl font-extrabold tracking-tight font-display">Profile</h1>
      <p className="mt-1 text-sm text-black/70">Your basic info and preferences</p>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={openWizard}
          className="inline-flex items-center gap-2 rounded-full bg-white border-[2px] border-black px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#111] active:translate-y-[1px]"
        >
          Complete Profile
        </button>
        <button
          type="button"
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--peach)] border-[2px] border-black px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#111] active:translate-y-[1px]"
        >
          Sign out
        </button>
      </div>

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
              <CardTitle className="font-extrabold">{profile?.name || form.name || "Your Name"}</CardTitle>
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
              <div className="mt-1 text-sm font-semibold">{(profile?.goals && profile.goals[0]) || (form.goals[0] ?? "-")}</div>
            </div>
            <div className="rounded-xl bg-[var(--peach)]/50 p-3 border-[2px] border-black shadow-[3px_3px_0_0_#111]">
              <div className="text-xs text-black/60">Activity</div>
              <div className="mt-1 text-sm font-semibold">{profile?.activityLevel || form.activityLevel || "-"}</div>
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
              <div className="mt-1 text-sm font-semibold">{(profile?.weightKg ?? form.weightKg) || "-"} {typeof (profile?.weightKg ?? form.weightKg) === "number" ? "kg" : ""}</div>
            </div>
            <div className="rounded-xl bg-[var(--sage)]/50 p-3 border-[2px] border-black shadow-[3px_3px_0_0_#111]">
              <div className="text-xs text-black/60">Height</div>
              <div className="mt-1 text-sm font-semibold">{(profile?.heightCm ?? form.heightCm) || "-"} {typeof (profile?.heightCm ?? form.heightCm) === "number" ? "cm" : ""}</div>
            </div>
            <div className="rounded-xl bg-[var(--peach)]/50 p-3 border-[2px] border-black shadow-[3px_3px_0_0_#111]">
              <div className="text-xs text-black/60">BMI</div>
              <div className="mt-1 text-sm font-semibold">{bmi ?? "-"}</div>
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

      {showWizard && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowWizard(false)} />
          <div className="relative z-10 mx-auto w-[92%] max-w-md mt-10">
            <section className="rounded-2xl border-2 border-black bg-[var(--soft-yellow)] p-4 shadow-[8px_8px_0_0_#111]">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 bg-white border-2 border-black shadow-[4px_4px_0_0_#111] text-xs font-extrabold uppercase tracking-wide">
                <span>Step</span>
                <span className="rounded-md bg-[var(--soft-yellow)] px-2 py-0.5 border border-black">{step}</span>
                <span>of 3</span>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <StepOne
                    name={form.name}
                    weightKg={form.weightKg}
                    heightCm={form.heightCm}
                    onChangeName={(v) => update("name", v)}
                    onChangeWeightKg={(v) => update("weightKg", v)}
                    onChangeHeightCm={(v) => update("heightCm", v)}
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowWizard(false)}
                      className="rounded-full bg-white border-2 border-black px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#111] active:translate-y-[1px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="rounded-full bg-white border-2 border-black px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#111] active:translate-y-[1px]"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <StepTwo
                    value={form.activityLevel}
                    onSelect={(v) => {
                      update("activityLevel", v);
                      setStep(3);
                    }}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="rounded-full bg-white border-2 border-black px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#111] active:translate-y-[1px]"
                    >
                      Back
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowWizard(false)}
                        className="rounded-full bg-white border-2 border-black px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#111] active:translate-y-[1px]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <StepThree
                    selected={form.goals}
                    onToggle={(goal) => {
                      const set = new Set(form.goals);
                      if (set.has(goal)) set.delete(goal);
                      else set.add(goal);
                      update("goals", Array.from(set));
                    }}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="rounded-full bg-white border-2 border-black px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#111] active:translate-y-[1px]"
                    >
                      Back
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowWizard(false)}
                        className="rounded-full bg-white border-2 border-black px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#111] active:translate-y-[1px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={saveProfile}
                        className="rounded-full bg-[var(--peach)] border-2 border-black px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#111] active:translate-y-[1px]"
                      >
                        Finish
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </main>
  );
}


