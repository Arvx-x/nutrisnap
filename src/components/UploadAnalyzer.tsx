"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UploadAnalyzer() {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [showResult, setShowResult] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [macros, setMacros] = React.useState<{
    name?: string;
    calories?: number;
    protein_g?: number;
    carbs_g?: number;
    fats_g?: number;
    sugar_g?: number;
  } | null>(null);
  const fileRef = React.useRef<File | null>(null);

  function handleFile(file?: File) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setShowResult(false);
    setMacros(null);
    fileRef.current = file;
  }

  return (
    <section className="mt-8">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-extrabold tracking-tight">Snap & Scan</h2>
        <span className="inline-block bg-[var(--sage)] text-[#1f3b2f] border border-black/10 rounded-full px-2 py-0.5 text-[11px] font-bold shadow-soft">
          AI Preview
        </span>
      </div>

      <Card className="mt-3 overflow-hidden">
        <CardContent className="p-4">
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Selected meal"
                className="w-full h-48 object-cover rounded-xl border border-black/10"
              />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <label className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold bg-black/5 active:scale-[0.99]">
                  Replace
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
                  />
                </label>
                <button
                  type="button"
                  className="rounded-2xl px-4 py-3 text-sm font-semibold bg-[var(--sage)] text-[#1f3b2f] shadow-soft active:scale-[0.99] disabled:opacity-60"
                  disabled={loading}
                  onClick={async () => {
                    if (!fileRef.current) return;
                    try {
                      setLoading(true);
                      const form = new FormData();
                      form.append("file", fileRef.current);
                      const res = await fetch("/api/analyze", { method: "POST", body: form });
                      const json = await res.json();
                      setMacros(json.result ?? null);
                      setShowResult(true);
                      // Clear preview after analysis completes
                      URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                      fileRef.current = null;
                    } catch (_) {
                      setShowResult(false);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? "Analyzing..." : "Analyze with AI"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="relative h-40 w-full rounded-xl border-2 border-dashed border-black/15 bg-[var(--peach)]/30 grid place-items-center text-black/70">
                <div className="text-center">
                  <div className="text-2xl">📷</div>
                  <div className="mt-1 text-xs">Upload a meal photo or take one</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <label className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold bg-white border border-black/10 shadow-soft active:scale-[0.99]">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
                  />
                </label>
                <label className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold bg-[var(--soft-yellow)] border border-black/10 shadow-soft active:scale-[0.99]">
                  Take Photo
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
                  />
                </label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showResult && (
        <Card className="mt-3">
          <CardHeader>
            <CardTitle>Estimated Nutrition</CardTitle>
          </CardHeader>
          <CardContent>
            {macros?.name && (
              <div className="mb-2 text-sm text-black/80">Detected: <span className="font-semibold">{macros.name}</span></div>
            )}
            <div className="space-y-3">
              <MacroBar label="Calories" value={macros?.calories} unit="kcal" color="bg-[var(--soft-yellow)]" max={900} />
              <MacroBar label="Protein" value={macros?.protein_g} unit="g" color="bg-[var(--sage)]" max={80} />
              <MacroBar label="Carbs" value={macros?.carbs_g} unit="g" color="bg-[var(--peach)]" max={120} />
              <MacroBar label="Fats" value={macros?.fats_g} unit="g" color="bg-black/10" max={80} />
              <MacroBar label="Sugar" value={macros?.sugar_g} unit="g" color="bg-black/20" max={80} />
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

function MacroBar({ label, value, unit, color, max = 100 }: { label: string; value?: number; unit: string; color: string; max?: number }) {
  const pct = Math.max(0, Math.min(100, value ? Math.round((value / max) * 100) : 0));
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-black/70 mb-1">
        <span>{label}</span>
        <span className="font-medium">{value ?? "~"} {unit}</span>
      </div>
      <div className="h-3 w-full rounded-full bg-black/10 overflow-hidden border border-black/10">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}


