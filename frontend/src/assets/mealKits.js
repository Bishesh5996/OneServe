export const heroImage = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1600&q=80";

export const mealKits = [
  {
    id: "kit-mediterranean",
    name: "Mediterranean Pasta Kit",
    description: "Sun-dried tomatoes, olives, basil, and feta come together for a bright single-serve meal.",
    price: 12.99,
    rating: 4.9,
    reviewsCount: 124,
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Best Seller",
    badgeColor: "bg-amber-100 text-amber-700",
    prepTime: "15 min",
    calories: 420,
    diet: "Dinner",
    category: "Dinner",
    status: "sale",
    comparePrice: 15.99,
    ingredients: ["Whole wheat pasta (100g)", "Kalamata olives (25g)", "Sun-dried tomatoes (30g)", "Fresh basil (10g)", "Feta cheese (40g)", "Olive oil packet"],
    nutrition: { calories: 420, protein: 15, carbs: 55, fat: 18 },
    tags: ["Mediterranean", "Single Serve"]
  },
  {
    id: "kit-grilled-chicken",
    name: "Grilled Chicken & Veggies",
    description: "Juicy grilled chicken with seasonal roasted vegetables and herb quinoa.",
    price: 12.99,
    rating: 4.8,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "High Protein",
    badgeColor: "bg-lime-100 text-lime-700",
    prepTime: "20 min",
    calories: 520,
    diet: "Dinner",
    category: "Dinner",
    status: "new",
    ingredients: ["Herb-marinated chicken breast", "Roasted carrots", "Charred broccolini", "Garlic quinoa", "Citrus vinaigrette"],
    nutrition: { calories: 520, protein: 36, carbs: 40, fat: 18 },
    tags: ["Protein", "Gluten Aware"]
  },
  {
    id: "kit-classic-carbonara",
    name: "Classic Carbonara",
    description: "Creamy pasta with crispy bacon, parmesan, and a silky egg sauce.",
    price: 14.99,
    rating: 4.9,
    reviewsCount: 87,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Chef's Pick",
    badgeColor: "bg-rose-100 text-rose-700",
    prepTime: "20 min",
    calories: 580,
    diet: "Dinner",
    category: "Dinner",
    status: "featured",
    ingredients: ["Fresh linguine", "Smoked bacon", "Parmesan", "Egg yolk sauce", "Cracked pepper"],
    nutrition: { calories: 580, protein: 24, carbs: 62, fat: 24 },
    tags: ["Italian", "Comfort Food"]
  },
  {
    id: "kit-salmon-quinoa",
    name: "Salmon & Quinoa Bowl",
    description: "Fresh grilled salmon served with quinoa and roasted asparagus.",
    price: 16.99,
    rating: 5,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Omega-3",
    badgeColor: "bg-sky-100 text-sky-700",
    prepTime: "25 min",
    calories: 610,
    diet: "Dinner",
    category: "Dinner",
    status: "sale",
    comparePrice: 19.99,
    ingredients: ["Wild salmon filet", "Tri-color quinoa", "Roasted asparagus", "Lemon vinaigrette", "Toasted almonds"],
    nutrition: { calories: 610, protein: 38, carbs: 48, fat: 24 },
    tags: ["Seafood", "High Protein"]
  },
  {
    id: "kit-vegan-bowl",
    name: "Vegan Buddha Bowl",
    description: "Tofu, avocado, and chickpeas served with tahini dressing and veggies.",
    price: 11.99,
    rating: 4.7,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Vegan",
    badgeColor: "bg-emerald-100 text-emerald-700",
    prepTime: "15 min",
    calories: 380,
    diet: "Lunch",
    category: "Lunch",
    status: "new",
    ingredients: ["Crispy tofu cubes", "Avocado slices", "Roasted chickpeas", "Pickled cabbage", "Tahini dressing"],
    nutrition: { calories: 380, protein: 18, carbs: 45, fat: 14 },
    tags: ["Plant-based", "Gluten Free"]
  },
  {
    id: "kit-street-tacos",
    name: "Street Tacos",
    description: "Seasoned beef tacos with fresh salsa, lime, and crisp slaw.",
    price: 13.99,
    rating: 4.6,
    reviewsCount: 87,
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "New",
    badgeColor: "bg-orange-100 text-orange-700",
    prepTime: "20 min",
    calories: 450,
    diet: "Dinner",
    category: "Dinner",
    status: "new",
    ingredients: ["Soft tortillas", "Seasoned beef", "Street corn salsa", "Avocado crema", "Citrus slaw"],
    nutrition: { calories: 450, protein: 24, carbs: 42, fat: 20 },
    tags: ["Mexican", "Spicy"]
  },
  {
    id: "kit-thai-green-curry",
    name: "Thai Green Curry",
    description: "Aromatic curry with chicken, jasmine rice, and coconut-lime sauce.",
    price: 15.99,
    rating: 4.9,
    reviewsCount: 163,
    image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Spicy",
    badgeColor: "bg-red-100 text-red-700",
    prepTime: "25 min",
    calories: 490,
    diet: "Dinner",
    category: "Dinner",
    status: "sale",
    comparePrice: 19.99,
    ingredients: ["Green curry sauce", "Chicken breast", "Bamboo shoots", "Thai basil", "Jasmine rice"],
    nutrition: { calories: 490, protein: 28, carbs: 54, fat: 18 },
    tags: ["Thai", "Spicy"]
  },
  {
    id: "kit-shrimp-stirfry",
    name: "Shrimp Stir-Fry",
    description: "Wok-tossed noodles with shrimp, snap peas, and sesame glaze.",
    price: 14.99,
    rating: 4.8,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Seafood",
    badgeColor: "bg-sky-100 text-sky-700",
    prepTime: "18 min",
    calories: 460,
    diet: "Dinner",
    category: "Dinner",
    status: "featured",
    ingredients: ["Shrimp", "Udon noodles", "Snap peas", "Carrot ribbons", "Sesame soy glaze"],
    nutrition: { calories: 460, protein: 28, carbs: 60, fat: 12 },
    tags: ["Seafood", "Quick"]
  },
  {
    id: "kit-margherita",
    name: "Personal Margherita",
    description: "Stone-fired crust topped with mozzarella, basil, and San Marzano tomatoes.",
    price: 11.49,
    rating: 5,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1548365328-73b01d5c0c94?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548365328-73b01d5c0c94?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Stone Fired",
    badgeColor: "bg-amber-100 text-amber-700",
    prepTime: "12 min",
    calories: 430,
    diet: "Dinner",
    category: "Dinner",
    status: "sale",
    comparePrice: 12.99,
    ingredients: ["Neapolitan dough", "Fresh mozzarella", "San Marzano sauce", "Basil leaves", "Garlic confit"],
    nutrition: { calories: 430, protein: 18, carbs: 52, fat: 15 },
    tags: ["Pizza", "Vegetarian"]
  },
  {
    id: "kit-mexican-bowl",
    name: "Mexican Bowl Kit",
    description: "Smoky black beans, roasted corn, guacamole, and cilantro rice.",
    price: 13.99,
    rating: 4.8,
    reviewsCount: 132,
    image: "https://images.unsplash.com/photo-1478749485505-2a903a729c63?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1478749485505-2a903a729c63?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Fiber-Rich",
    badgeColor: "bg-lime-100 text-lime-700",
    prepTime: "18 min",
    calories: 490,
    diet: "Lunch",
    category: "Lunch",
    status: "featured",
    ingredients: ["Cilantro rice", "Black beans", "Roasted corn", "Tomato salsa", "Avocado"],
    nutrition: { calories: 490, protein: 22, carbs: 62, fat: 16 },
    tags: ["Gluten Free", "Single Serve"]
  }
];

export const testimonials = [
  {
    quote: "OneServe has completely changed how I cook. No more waiting for delivery or boring ingredients. I'll never use anything else again!",
    author: "Sarah Mitchell",
    location: "New York, NY",
    rating: 5
  },
  {
    quote: "As someone who lives alone, OneServe is a game-changer. The quality is amazing and the recipes are so easy to follow. Highly recommend!",
    author: "James Rodriguez",
    location: "Los Angeles, CA",
    rating: 5
  },
  {
    quote: "I love cooking but hate meal planning. OneServe does all the hard work for me. Fresh ingredients delivered right to my door.",
    author: "Emily Chen",
    location: "Chicago, IL",
    rating: 5
  }
];
