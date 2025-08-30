type Props = {
  selected: string[];
  onToggle: (goal: string) => void;
};

const GOAL_OPTIONS: Array<{ key: string; label: string; desc: string }> = [
  { key: "Lose Weight", label: "Lose Weight", desc: "Reduce body fat and weight" },
  { key: "Gain Muscle", label: "Gain Muscle", desc: "Build strength and size" },
  { key: "Maintain Health", label: "Maintain Health", desc: "Balanced nutrition and energy" },
];

export default function StepThree({ selected, onToggle }: Props) {
  return (
    <div>
      <h2 className="text-lg font-extrabold tracking-tight">What are your goals?</h2>
      <div className="mt-4 grid gap-3">
        {GOAL_OPTIONS.map((opt) => {
          const isSelected = selected.includes(opt.key);
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onToggle(opt.key)}
              className={
                "text-left rounded-2xl border-2 px-4 py-3 shadow-[6px_6px_0_0_#111] active:translate-y-[1px] " +
                (isSelected ? "bg-[var(--peach)] border-black" : "bg-white border-black")
              }
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold">{opt.label}</span>
                {isSelected && <span className="text-xs font-bold">Selected</span>}
              </div>
              <div className="text-xs text-black/70 mt-0.5">{opt.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


