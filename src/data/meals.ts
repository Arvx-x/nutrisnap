export type MealData = {
  id: string;
  name: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  summary: string;
  description: string;
  image: string;
};

export const meals: MealData[] = [
  {
    id: "grilled-chicken-bowl",
    name: "Grilled Chicken Bowl",
    calories: 420,
    protein: "38g",
    carbs: "36g",
    fat: "14g",
    summary: "420 kcal • High Protein",
    description:
      "Juicy grilled chicken served with quinoa, roasted veggies, and a light herb dressing. Balanced macros ideal for post-workout fuel.",
    image: "/placeholder-meal.svg",
  },
  {
    id: "veggie-pasta",
    name: "Creamy Veggie Pasta",
    calories: 510,
    protein: "18g",
    carbs: "72g",
    fat: "16g",
    summary: "510 kcal • Balanced",
    description:
      "Whole-wheat pasta tossed with seasonal veggies in a light creamy sauce. Comforting yet mindful.",
    image: "/placeholder-meal.svg",
  },
  {
    id: "salmon-avocado-salad",
    name: "Salmon Avocado Salad",
    calories: 380,
    protein: "28g",
    carbs: "20g",
    fat: "20g",
    summary: "380 kcal • Omega-3 Rich",
    description:
      "Fresh greens topped with seared salmon, avocado, and citrus vinaigrette. Bright flavors with healthy fats.",
    image: "/placeholder-meal.svg",
  },
];


