import { ProductRepository } from "../../repositories/product.repository.js";

const BASE_CUSTOMIZATIONS = [
  {
    name: "Sea Salt Packet",
    description: "Add or remove our flaky sea salt sachet to finish the dish.",
    unitPrice: 0.25,
    minQuantity: 0,
    maxQuantity: 2,
    defaultQuantity: 1
  },
  {
    name: "House Sauce Drizzle",
    description: "Boost the signature sauce or skip it entirely.",
    unitPrice: 0.75,
    minQuantity: 0,
    maxQuantity: 2,
    defaultQuantity: 1
  },
  {
    name: "Extra Veggie Boost",
    description: "Add more roasted seasonal vegetables.",
    unitPrice: 1.5,
    minQuantity: 0,
    maxQuantity: 2,
    defaultQuantity: 0
  }
];

const createCustomizations = (extras = []) => [
  ...BASE_CUSTOMIZATIONS.map((custom) => ({ ...custom })),
  ...extras.map((extra) => ({ ...extra }))
];

const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

const applyUniqueSlugs = (items = []) => {
  const used = new Set();
  return items.map((item) => {
    const base = slugify(item.slug ?? item.name ?? "");
    if (!base) {
      throw new Error(`Unable to generate slug for product "${item.name ?? "Unnamed"}"`);
    }
    let slug = base;
    let suffix = 2;
    while (used.has(slug)) {
      slug = `${base}-${suffix}`;
      suffix += 1;
    }
    used.add(slug);
    return { ...item, slug };
  });
};

const rawProducts = [
  {
    name: "Mediterranean Chickpea Bowl",
    description: "Protein-packed chickpeas with roasted veggies and herbed tahini.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=700&q=80"
    ],
    price: 14.5,
    category: "Lunch",
    diet: "Vegetarian",
    prepTime: 18,
    tags: ["vegan", "gluten-free"],
    rating: 4.9,
    nutrition: { calories: 520, protein: 21, carbs: 68, fat: 18 },
    ingredients: ["Roasted chickpeas", "Charred veggies", "Herbed tahini", "Brown rice"],
    customizations: createCustomizations([
      { name: "Citrus Sumac", description: "Brighten the bowl with extra sumac.", unitPrice: 0.4, minQuantity: 0, maxQuantity: 2, defaultQuantity: 1 }
    ])
  },
  {
    name: "Spicy Harissa Salmon",
    description: "Wild salmon, harissa glaze, and quinoa tabbouleh.",
    image: "https://images.unsplash.com/photo-1476127397018-4f5bb1a4d0c7?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80"],
    price: 18.75,
    category: "Dinner",
    diet: "Pescatarian",
    prepTime: 22,
    tags: ["omega-3", "high-protein"],
    rating: 4.8,
    nutrition: { calories: 610, protein: 39, carbs: 34, fat: 29 },
    ingredients: ["Wild salmon", "Harissa sauce", "Quinoa", "Fresh herbs"],
    customizations: createCustomizations([
      { name: "Harissa Glaze", description: "Control the heat level.", unitPrice: 0.6, minQuantity: 0, maxQuantity: 2, defaultQuantity: 1 },
      { name: "Toasted Almonds", description: "Add crunch.", unitPrice: 0.9, minQuantity: 0, maxQuantity: 2, defaultQuantity: 0 }
    ])
  },
  {
    name: "Smoky BBQ Jackfruit",
    description: "Pulled jackfruit, charred corn, pickled onions, and ranch drizzle.",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"],
    price: 13.25,
    category: "Dinner",
    diet: "Vegan",
    prepTime: 20,
    tags: ["comfort", "smoky"],
    rating: 4.7,
    nutrition: { calories: 550, protein: 18, carbs: 70, fat: 20 },
    ingredients: ["Jackfruit", "House BBQ sauce", "Charred corn", "Pickled onions"],
    customizations: createCustomizations([
      { name: "Smoky Rub", description: "Dial the smokiness up or down.", unitPrice: 0.35, minQuantity: 0, maxQuantity: 2, defaultQuantity: 1 }
    ])
  },
  {
    name: "Lemon Herb Chicken Orzo",
    description: "Roasted chicken thighs, lemon orzo, and blistered tomatoes.",
    image: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80"],
    price: 16.5,
    category: "Dinner",
    diet: "High-Protein",
    prepTime: 25,
    tags: ["citrus", "herb"],
    rating: 4.9,
    nutrition: { calories: 640, protein: 38, carbs: 60, fat: 25 },
    ingredients: ["Chicken thighs", "Orzo", "Lemon butter", "Tomatoes"]
  },
  {
    name: "Thai Coconut Curry Noodles",
    description: "Rice noodles in a creamy lemongrass coconut broth.",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80"],
    price: 13.9,
    category: "Dinner",
    diet: "Vegetarian",
    prepTime: 17,
    tags: ["curry", "comfort"],
    rating: 4.8,
    nutrition: { calories: 560, protein: 16, carbs: 74, fat: 20 },
    ingredients: ["Rice noodles", "Coconut milk", "Lemongrass", "Thai basil"]
  },
  {
    name: "Pesto Shrimp Zoodles",
    description: "Garlic shrimp over zucchini noodles with basil pesto.",
    image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=650&q=80"],
    price: 17.25,
    category: "Dinner",
    diet: "Low-Carb",
    prepTime: 15,
    tags: ["pescatarian", "light"],
    rating: 4.7,
    nutrition: { calories: 410, protein: 32, carbs: 18, fat: 22 },
    ingredients: ["Shrimp", "Zucchini noodles", "Basil pesto", "Cherry tomatoes"]
  },
  {
    name: "Korean Bulgogi Rice Bowl",
    description: "Sweet soy beef bulgogi with sticky rice and sesame greens.",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80"],
    price: 15.95,
    category: "Dinner",
    diet: "Beef",
    prepTime: 24,
    tags: ["sweet-savory"],
    rating: 4.9,
    nutrition: { calories: 680, protein: 36, carbs: 72, fat: 26 },
    ingredients: ["Beef bulgogi", "Sticky rice", "Sesame greens", "Pickled radish"]
  },
  {
    name: "Tuscan White Bean Stew",
    description: "Slow-simmered beans with kale, fennel, and rosemary oil.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=900&q=80",
    gallery: ["https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=800&q=80"],
    price: 12.5,
    category: "Lunch",
    diet: "Vegetarian",
    prepTime: 30,
    tags: ["hearty", "fiber"],
    rating: 4.6,
    nutrition: { calories: 480, protein: 20, carbs: 65, fat: 12 },
    ingredients: ["Cannellini beans", "Kale", "Tomato broth", "Rosemary oil"]
  },
  {
    name: "Chipotle Sweet Potato Tacos",
    description: "Roasted sweet potatoes with chipotle crema and black beans.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1100&q=80",
    price: 12.25,
    category: "Dinner",
    diet: "Vegan",
    prepTime: 16,
    tags: ["smoky", "street-food"],
    rating: 4.8,
    nutrition: { calories: 520, protein: 17, carbs: 68, fat: 18 },
    ingredients: ["Sweet potatoes", "Chipotle crema", "Black beans", "Cabbage slaw"]
  },
  {
    name: "Miso Glazed Cod",
    description: "Silky cod filet with miso glaze, baby bok choy, and rice.",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80",
    price: 19.5,
    category: "Dinner",
    diet: "Pescatarian",
    prepTime: 20,
    tags: ["miso", "light"],
    rating: 4.8,
    nutrition: { calories: 580, protein: 40, carbs: 45, fat: 22 },
    ingredients: ["Cod filet", "Miso glaze", "Baby bok choy", "Jasmine rice"]
  },
  {
    name: "Greek Mezze Platter",
    description: "Falafel, lemon rice, olives, tzatziki, and warm pita.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80",
    price: 15.25,
    category: "Lunch",
    diet: "Vegetarian",
    prepTime: 19,
    tags: ["mezze", "shareable"],
    rating: 4.7,
    nutrition: { calories: 600, protein: 22, carbs: 78, fat: 22 },
    ingredients: ["Falafel", "Lemon rice", "Tzatziki", "Warm pita"]
  },
  {
    name: "Teriyaki Tofu Stir Fry",
    description: "Caramelized tofu, rainbow vegetables, and sesame rice.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
    price: 13.95,
    category: "Dinner",
    diet: "Vegan",
    prepTime: 18,
    tags: ["stir-fry"],
    rating: 4.6,
    nutrition: { calories: 540, protein: 24, carbs: 70, fat: 18 },
    ingredients: ["Tofu", "Teriyaki sauce", "Veggie medley", "Sesame rice"]
  },
  {
    name: "Moroccan Lamb Couscous",
    description: "Spiced lamb meatballs with apricot-citrus couscous.",
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80",
    price: 18.35,
    category: "Dinner",
    diet: "Lamb",
    prepTime: 28,
    tags: ["spiced", "north-african"],
    rating: 4.8,
    nutrition: { calories: 720, protein: 34, carbs: 76, fat: 30 },
    ingredients: ["Lamb meatballs", "Couscous", "Apricot glaze", "Mint yogurt"]
  },
  {
    name: "Garden Veggie Flatbread",
    description: "Crispy flatbread with basil pesto, squash, and ricotta.",
    image: "https://images.unsplash.com/photo-1543351611-58f69d43aaf8?auto=format&fit=crop&w=900&q=80",
    price: 11.75,
    category: "Lunch",
    diet: "Vegetarian",
    prepTime: 15,
    tags: ["flatbread", "pesto"],
    rating: 4.5,
    nutrition: { calories: 480, protein: 19, carbs: 55, fat: 19 },
    ingredients: ["Flatbread", "Basil pesto", "Seasonal veggies", "Ricotta"]
  },
  {
    name: "Blackened Tilapia with Mango Salsa",
    description: "Seared tilapia, coconut rice, and fresh mango salsa.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    price: 16.2,
    category: "Dinner",
    diet: "Pescatarian",
    prepTime: 21,
    tags: ["tropical"],
    rating: 4.7,
    nutrition: { calories: 590, protein: 37, carbs: 62, fat: 20 },
    ingredients: ["Tilapia", "Blackening spice", "Coconut rice", "Mango salsa"]
  },
  {
    name: "Classic Carbonara Cup",
    description: "Creamy pancetta carbonara ready in minutes.",
    image: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=80",
    price: 14.0,
    category: "Dinner",
    diet: "Pasta",
    prepTime: 12,
    tags: ["creamy", "classic"],
    rating: 4.8,
    nutrition: { calories: 650, protein: 24, carbs: 78, fat: 25 },
    ingredients: ["Pancetta", "Egg yolk sauce", "Spaghetti", "Parmesan"]
  },
  {
    name: "Butter Chicken with Turmeric Rice",
    description: "Creamy tomato butter chicken served with fragrant rice.",
    image: "https://images.unsplash.com/photo-1608039829574-23a30dfeae64?auto=format&fit=crop&w=900&q=80",
    price: 16.8,
    category: "Dinner",
    diet: "Chicken",
    prepTime: 26,
    tags: ["indian", "comfort"],
    rating: 4.9,
    nutrition: { calories: 720, protein: 36, carbs: 68, fat: 32 },
    ingredients: ["Chicken thighs", "Butter sauce", "Turmeric rice", "Cilantro"]
  },
  {
    name: "Street-Style Paneer Wrap",
    description: "Charred paneer, crunchy veggies, and chili yogurt spread.",
    image: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=900&q=80",
    price: 12.9,
    category: "Lunch",
    diet: "Vegetarian",
    prepTime: 14,
    tags: ["wrap", "street-food"],
    rating: 4.6,
    nutrition: { calories: 540, protein: 24, carbs: 58, fat: 22 },
    ingredients: ["Paneer", "Whole wheat wrap", "Chili yogurt", "Veggie slaw"]
  },
  {
    name: "Sesame Crunch Buddha Bowl",
    description: "Roasted veggies, edamame, crunchy seeds, and miso dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    price: 13.5,
    category: "Lunch",
    diet: "Vegan",
    prepTime: 19,
    tags: ["buddha-bowl"],
    rating: 4.7,
    nutrition: { calories: 510, protein: 23, carbs: 63, fat: 17 },
    ingredients: ["Roasted veggies", "Edamame", "Seeds", "Miso dressing"]
  },
  {
    name: "Maple Dijon Pork Medallions",
    description: "Juicy pork medallions with maple glaze and roasted carrots.",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=950&q=80",
    price: 16.1,
    category: "Dinner",
    diet: "Pork",
    prepTime: 23,
    tags: ["sweet-savory"],
    rating: 4.6,
    nutrition: { calories: 640, protein: 40, carbs: 52, fat: 26 },
    ingredients: ["Pork medallions", "Maple Dijon glaze", "Roasted carrots", "Mashed potatoes"]
  },
  {
    name: "Breakfast Frittata Kit",
    description: "Spinach, roasted peppers, feta, and herb potatoes.",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80",
    price: 11.95,
    category: "Breakfast",
    diet: "Vegetarian",
    prepTime: 16,
    tags: ["brunch"],
    rating: 4.5,
    nutrition: { calories: 430, protein: 21, carbs: 32, fat: 24 },
    ingredients: ["Eggs", "Spinach", "Roasted peppers", "Feta"]
  },
  {
    name: "Vietnamese Lemongrass Beef",
    description: "Caramelized lemongrass beef over vermicelli with herbs.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80",
    price: 15.7,
    category: "Dinner",
    diet: "Beef",
    prepTime: 20,
    tags: ["lemongrass", "fresh"],
    rating: 4.9,
    nutrition: { calories: 610, protein: 34, carbs: 66, fat: 22 },
    ingredients: ["Beef", "Lemongrass marinade", "Vermicelli", "Fresh herbs"]
  },
  {
    name: "Roasted Cauliflower Shawarma",
    description: "Za’atar cauliflower, pickled onions, and garlic toum.",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=900&q=80",
    price: 13.1,
    category: "Dinner",
    diet: "Vegan",
    prepTime: 18,
    tags: ["shawarma", "spiced"],
    rating: 4.7,
    nutrition: { calories: 500, protein: 16, carbs: 60, fat: 20 },
    ingredients: ["Cauliflower", "Za’atar", "Pickled onions", "Garlic toum"]
  },
  {
    name: "Garlic Parmesan Gnocchi Bake",
    description: "Pillowy gnocchi baked with roasted garlic cream and greens.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80",
    price: 14.4,
    category: "Dinner",
    diet: "Vegetarian",
    prepTime: 20,
    tags: ["bake", "comfort"],
    rating: 4.8,
    nutrition: { calories: 690, protein: 23, carbs: 82, fat: 30 },
    ingredients: ["Potato gnocchi", "Garlic cream", "Spinach", "Parmesan"]
  },
  {
    name: "Mediterranean Turkey Meatballs",
    description: "Lean turkey meatballs with dill yogurt and farro tabbouleh.",
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80",
    price: 15.2,
    category: "Dinner",
    diet: "Turkey",
    prepTime: 24,
    tags: ["lean", "mediterranean"],
    rating: 4.6,
    nutrition: { calories: 580, protein: 33, carbs: 58, fat: 22 },
    ingredients: ["Turkey meatballs", "Farro tabbouleh", "Dill yogurt", "Roasted peppers"]
  },
  {
    name: "Chili Lime Shrimp Tacos",
    description: "Zesty shrimp tacos with mango slaw and cilantro crema.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    price: 15.9,
    category: "Dinner",
    diet: "Pescatarian",
    prepTime: 14,
    tags: ["tacos", "fresh"],
    rating: 4.9,
    nutrition: { calories: 520, protein: 28, carbs: 52, fat: 20 },
    ingredients: ["Shrimp", "Chili lime rub", "Mango slaw", "Cilantro crema"]
  }
];

const products = applyUniqueSlugs(
  rawProducts.map((product) => ({
    ...product,
    customizations: product.customizations ?? createCustomizations([])
  }))
);

export const seedProducts = async () => {
  const repo = new ProductRepository();
  const inserted = await repo.seed(products);
  return inserted;
};
