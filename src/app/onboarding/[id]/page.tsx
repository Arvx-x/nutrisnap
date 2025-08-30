"use client";

import { useState } from "react";
import StepOne from "@/components/onboarding/StepOne";
import StepTwo from "@/components/onboarding/StepTwo";
import StepThree from "@/components/onboarding/StepThree";
import { useRouter } from "next/navigation";

type FormState = {
  name?: string;
  weightKg?: number | "";
  heightCm?: number | "";
  activityLevel?: string;
  dietaryPreferences: string[];
  goals: string[];
};

export default function OnboardingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>({
    name: "",
    weightKg: "",
    heightCm: "",
    activityLevel: "",
    dietaryPreferences: [],
    goals: [],
  });

  function next() {
    setStep((s) => Math.min(3, s + 1));
  }
  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function StepOneView() {
    return (
      <div className="space-y-4">
        <StepOne
          name={form.name ?? ""}
          weightKg={form.weightKg ?? ""}
          heightCm={form.heightCm ?? ""}
          onChangeName={(v) => update("name", v)}
          onChangeWeightKg={(v) => update("weightKg", v)}
          onChangeHeightCm={(v) => update("heightCm", v)}
        />
        <div>
          <label className="block text-sm font-semibold">Activity level</label>
          <input
            className="mt-1 w-full rounded-xl border-2 border-black px-3 py-2 shadow-[4px_4px_0_0_#111]"
            placeholder="e.g., sedentary, moderate, active"
            value={form.activityLevel ?? ""}
            onChange={(e) => update("activityLevel", e.target.value)}
          />
        </div>
      </div>
    );
  }

  function StepTwoView() {
    return (
      <StepTwo
        value={form.activityLevel ?? ""}
        onSelect={(v) => {
          update("activityLevel", v);
          setStep(3);
        }}
      />
    );
  }

  async function onSubmit() {
    const payload = {
      name: form.name || undefined,
      weightKg: form.weightKg === "" ? undefined : form.weightKg,
      heightCm: form.heightCm === "" ? undefined : form.heightCm,
      activityLevel: form.activityLevel || undefined,
      dietaryPreferences: form.dietaryPreferences,
      goals: form.goals,
    };

    const res = await fetch(`/api/users/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      let err: { error?: string } = {};
      try {
        err = (await res.json()) as { error?: string };
      } catch {}
      alert(err?.error || "Failed to save onboarding data");
    }
  }

  return (
    <main className="px-5 pt-6 pb-8 max-w-md mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-extrabold tracking-tight">Onboarding</h1>
        <p className="text-sm text-black/70">User ID: {params.id}</p>
      </header>

      <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 bg-white border-2 border-black shadow-[4px_4px_0_0_#111] text-xs font-extrabold uppercase tracking-wide">
        <span>Step</span>
        <span className="rounded-md bg-[var(--soft-yellow)] px-2 py-0.5 border border-black">{step}</span>
        <span>of 3</span>
      </div>

      <section className="rounded-2xl border-2 border-black bg-[var(--soft-yellow)]/60 p-4 shadow-[8px_8px_0_0_#111]">
        {step === 1 && <StepOneView />}
        {step === 2 && <StepTwoView />}
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
            <div>
              <label className="block text-sm font-semibold">Dietary preferences (comma-separated)</label>
              <input
                className="mt-1 w-full rounded-xl border-2 border-black px-3 py-2 shadow-[4px_4px_0_0_#111]"
                placeholder="e.g., vegetarian, dairy-free"
                value={form.dietaryPreferences.join(", ")}
                onChange={(e) =>
                  update(
                    "dietaryPreferences",
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
              />
            </div>
          </div>
        )}
      </section>

      <div className="mt-5 flex items-center justify-between">
        <button
          className="rounded-xl px-4 py-2 bg-white border-2 border-black font-bold shadow-[4px_4px_0_0_#111] disabled:opacity-50 active:translate-y-[1px]"
          onClick={back}
          disabled={step === 1}
        >
          Back
        </button>
        {step < 3 ? (
          <button
            className="rounded-xl px-4 py-2 bg-[var(--sage)] border-2 border-black font-bold shadow-[4px_4px_0_0_#111] disabled:opacity-50 active:translate-y-[1px]"
            onClick={next}
          >
            Next
          </button>
        ) : (
          <button
            className="rounded-xl px-4 py-2 bg-[var(--peach)] border-2 border-black font-bold shadow-[4px_4px_0_0_#111] active:translate-y-[1px]"
            onClick={onSubmit}
          >
            Finish
          </button>
        )}
      </div>
    </main>
  );
}


