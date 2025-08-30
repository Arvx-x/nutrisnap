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
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=60",
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
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=60",
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
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: "tofu-stir-fry",
    name: "Tofu Veggie Stir Fry",
    calories: 440,
    protein: "24g",
    carbs: "48g",
    fat: "16g",
    summary: "440 kcal • Plant Protein",
    description:
      "Crispy tofu tossed with colorful veggies in a light soy-ginger glaze. Satisfying and macro-balanced for weekday dinners.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: "mediterranean-wrap",
    name: "Mediterranean Turkey Wrap",
    calories: 430,
    protein: "30g",
    carbs: "42g",
    fat: "14g",
    summary: "430 kcal • Lean Protein",
    description:
      "Whole-grain wrap filled with turkey, hummus, crunchy veggies, and herbs. Light, fresh, and perfect on-the-go.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=60",
  },
];


