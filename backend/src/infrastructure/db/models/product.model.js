import { Schema, model } from "mongoose";

const NutritionSchema = new Schema(
  {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  { _id: false }
);

const CustomizationSchema = new Schema(
  {
    name: String,
    description: String,
    unitPrice: Number,
    stock: { type: Number, default: 0 },
    minQuantity: { type: Number, default: 0 },
    maxQuantity: { type: Number, default: 2 },
    defaultQuantity: { type: Number, default: 1 }
  },
  { _id: true }
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    description: String,
    image: String,
    gallery: [String],
    price: Number,
    stock: { type: Number, default: 0 },
    currency: { type: String, default: "NPR" },
    comparePrice: Number,
    category: String,
    diet: String,
    prepTime: Number,
    ingredients: [String],
    tags: [String],
    rating: { type: Number, default: 4.8 },
    nutrition: NutritionSchema,
    customizations: [CustomizationSchema]
  },
  { timestamps: true }
);

export const ProductModel = model("Product", ProductSchema);
