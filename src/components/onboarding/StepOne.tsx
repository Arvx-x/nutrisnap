type Props = {
  name: string;
  weightKg: number | "";
  heightCm: number | "";
  onChangeName: (value: string) => void;
  onChangeWeightKg: (value: number | "") => void;
  onChangeHeightCm: (value: number | "") => void;
};

export default function StepOne({
  name,
  weightKg,
  heightCm,
  onChangeName,
  onChangeWeightKg,
  onChangeHeightCm,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold">Name</label>
        <input
          className="mt-1 w-full rounded-xl border-2 border-black px-3 py-2 shadow-[4px_4px_0_0_#111]"
          placeholder="Your name"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold">Weight (kg)</label>
        <input
          type="number"
          step="0.1"
          className="mt-1 w-full rounded-xl border-2 border-black px-3 py-2 shadow-[4px_4px_0_0_#111]"
          placeholder="e.g., 72.5"
          value={weightKg}
          onChange={(e) => onChangeWeightKg(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold">Height (cm)</label>
        <input
          type="number"
          step="0.1"
          className="mt-1 w-full rounded-xl border-2 border-black px-3 py-2 shadow-[4px_4px_0_0_#111]"
          placeholder="e.g., 175"
          value={heightCm}
          onChange={(e) => onChangeHeightCm(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>
    </div>
  );
}


