type Props = {
  value: string;
  onSelect: (value: string) => void;
};

const options: Array<{ key: string; label: string; desc: string }> = [
  { key: "Low", label: "Low", desc: "Mostly sedentary" },
  { key: "Moderate", label: "Moderate", desc: "Some weekly activity" },
  { key: "High", label: "High", desc: "Active most days" },
];

export default function StepTwo({ value, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-lg font-extrabold tracking-tight">What is your activity level?</h2>
      <div className="mt-4 grid gap-3">
        {options.map((opt) => {
          const selected = value === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelect(opt.key)}
              className={
                "text-left rounded-2xl border-2 px-4 py-3 shadow-[6px_6px_0_0_#111] active:translate-y-[1px] " +
                (selected
                  ? "bg-[var(--sage)] border-black"
                  : "bg-white border-black")
              }
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold">{opt.label}</span>
                {selected && <span className="text-xs font-bold">Selected</span>}
              </div>
              <div className="text-xs text-black/70 mt-0.5">{opt.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


