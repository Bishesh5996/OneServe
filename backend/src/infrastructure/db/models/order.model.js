import { Schema, model } from "mongoose";

const OrderCustomizationSchema = new Schema(
  {
    id: String,
    name: String,
    quantity: Number,
    unitPrice: Number,
    defaultQuantity: Number
  },
  { _id: false }
);

const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: String,
    quantity: Number,
    price: Number,
    basePrice: Number,
    image: String,
    customizations: [OrderCustomizationSchema]
  },
  { _id: false }
);

const ShippingSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zip: String
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    total: Number,
    shipping: ShippingSchema,
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "out-for-delivery", "delivered"],
      default: "pending"
    },
    trackingCode: { type: String, required: true }
  },
  { timestamps: true }
);

export const OrderModel = model("Order", OrderSchema);
