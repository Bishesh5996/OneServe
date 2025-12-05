import { Schema, model } from "mongoose";

const AddressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String
});

const FavoriteCustomizationSchema = new Schema(
  {
    id: String,
    name: String,
    description: String,
    unitPrice: Number,
    minQuantity: Number,
    maxQuantity: Number,
    defaultQuantity: Number
  },
  { _id: false }
);

const FavoriteSchema = new Schema(
  {
    productId: { type: String, required: true },
    slug: { type: String, trim: true, lowercase: true },
    name: String,
    price: Number,
    image: String,
    rating: Number,
    description: String,
    category: String,
    customizations: [FavoriteCustomizationSchema]
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer" },
    businessName: { type: String },
    phone: { type: String },
    avatar: { type: String },
    address: AddressSchema,
    favorites: [FavoriteSchema]
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
