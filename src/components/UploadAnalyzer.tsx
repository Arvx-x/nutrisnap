"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UploadAnalyzer() {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [showResult, setShowResult] = React.useState(false);

  function handleFile(file?: File) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setShowResult(false);
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
                  className="rounded-2xl px-4 py-3 text-sm font-semibold bg-[var(--sage)] text-[#1f3b2f] shadow-soft active:scale-[0.99]"
                  onClick={() => setShowResult(true)}
                >
                  Analyze with AI
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
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-[var(--soft-yellow)] p-3">
                <div className="text-xs text-black/60">Calories</div>
                <div className="mt-1 text-sm font-semibold">~450 kcal</div>
              </div>
              <div className="rounded-xl bg-[var(--sage)]/50 p-3">
                <div className="text-xs text-black/60">Protein</div>
                <div className="mt-1 text-sm font-semibold">~25 g</div>
              </div>
              <div className="rounded-xl bg-[var(--peach)]/50 p-3">
                <div className="text-xs text-black/60">Carbs</div>
                <div className="mt-1 text-sm font-semibold">~50 g</div>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-black/60">
              This is a demo. AI analysis will be more precise with server integration.
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}


