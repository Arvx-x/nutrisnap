"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export interface MealCardProps {
  imageUrl: string;
  title: string;
  summary: string;
  tag?: string; // e.g., "High Protein"
  footer?: string; // e.g., "400 kcal • 25g Protein"
  taller?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({ imageUrl, title, summary, tag, footer, taller = false }) => {
  return (
    <Card
      className={`relative rounded-xl border-[3px] border-black bg-white shadow-[6px_6px_0_0_#111] 
      overflow-hidden flex flex-col ${taller ? 'h-[420px]' : 'h-[360px]'}`}
    >
      {/* Comic border overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[12px] overflow-hidden">
        <div
          className="absolute inset-0 rounded-[12px] border-[2.5px] border-black/90 z-20"
          style={{ clipPath: 'polygon(1% 0, 99% 0, 100% 98%, 0 100%)' }}
        />
        <div
          className="absolute inset-[3px] rounded-[10px] border-[1.5px] border-black/80 z-20"
          style={{ clipPath: 'polygon(0 2%, 100% 0, 98% 100%, 0 98%)' }}
        />
      </div>

      {/* Halftone dots background */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '6px 6px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full ${taller ? 'h-56' : 'h-44'} object-cover rounded-t-[10px]`}
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              if (el.dataset.fallback !== '1') {
                el.dataset.fallback = '1';
                el.src = '/placeholder-meal.svg';
              }
            }}
          />
          {tag && (
            <div className="absolute left-2 top-2 z-10">
              <div className="relative bg-yellow-300 border-[2px] border-black rounded-full px-3 py-1 text-[11px] sm:text-[12px] font-extrabold uppercase tracking-tight shadow-[2px_2px_0_0_#111]">
                {tag}
                <span className="absolute -bottom-1 left-4 w-2 h-2 bg-yellow-300 border-b-[2px] border-l-[2px] border-black rotate-45" />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col px-3 py-3 space-y-2">
          <h3 className="text-[18px] font-extrabold leading-tight tracking-tight font-display">{title}</h3>
          <p className="text-sm text-zinc-700 leading-relaxed">{summary}</p>
          {footer && (
            <div className="mt-auto">
              <span className="inline-block bg-yellow-200 border-[2px] border-black rounded-[6px] px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-[3px_3px_0_0_#111]">
                {footer}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MealCard;


