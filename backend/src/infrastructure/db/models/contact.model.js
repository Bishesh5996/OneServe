import { Schema, model } from "mongoose";

const ContactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "in-progress", "closed"], default: "new" }
  },
  { timestamps: true }
);

export const ContactModel = model("ContactSubmission", ContactSchema);
