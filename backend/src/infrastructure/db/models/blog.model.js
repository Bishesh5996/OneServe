import { Schema, model } from "mongoose";

const BlogSectionSchema = new Schema(
  {
    heading: String,
    body: String,
    image: String
  },
  { _id: false }
);

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: String,
    heroImage: String,
    readMinutes: { type: Number, default: 5 },
    productId: { type: String },
    publishedAt: { type: Date, default: Date.now },
    sections: [BlogSectionSchema]
  },
  { timestamps: true }
);

export const BlogModel = model("Blog", BlogSchema);
