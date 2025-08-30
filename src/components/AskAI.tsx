"use client";

import React from "react";
import type { MealData } from "@/data/meals";

export default function AskAI({ meal }: { meal: MealData }) {
  const [question, setQuestion] = React.useState("");
  type ChatMessage = { id: string; role: "user" | "assistant"; content: string };
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: question.trim() };
      setMessages((prev) => [...prev, userMsg]);
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, meal }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to ask AI");
      const aiMsg: ChatMessage = { id: crypto.randomUUID(), role: "assistant", content: String(json.answer || "") };
      setMessages((prev) => [...prev, aiMsg]);
      setQuestion("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error asking AI");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      {/* Conversation area (bubbles) */}
      {error && (
        <div className="mb-2 text-xs text-red-600">{error}</div>
      )}
      <div className="space-y-2 mb-20">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                "max-w-[85%] whitespace-pre-wrap px-3 py-2 text-sm border-[2px] border-black shadow-[3px_3px_0_0_#111] " +
                (msg.role === "user"
                  ? "rounded-2xl rounded-tr-sm bg-[var(--peach)]/60"
                  : "rounded-2xl rounded-tl-sm bg-[var(--soft-yellow)]/80")
              }
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] px-3 py-2 text-sm border-[2px] border-black shadow-[3px_3px_0_0_#111] rounded-2xl rounded-tl-sm bg-white">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Floating input bar above navbar */}
      <form
        onSubmit={onSubmit}
        className="fixed left-2 right-2 bottom-4 z-[60] mx-auto max-w-md flex items-center gap-2 bg-white/95 backdrop-blur rounded-full border-[2px] border-black px-3 py-2 shadow-[4px_4px_0_0_#111]"
        aria-label="Ask AI about this meal"
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask to modify or learn about this meal..."
          className="flex-1 bg-transparent outline-none text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide bg-[var(--sage)] text-[#1f3b2f] border-[2px] border-black shadow-[3px_3px_0_0_#111] active:translate-y-[1px] disabled:opacity-60"
        >
          {loading ? "Asking..." : "Ask AI"}
        </button>
      </form>
    </div>
  );
}


