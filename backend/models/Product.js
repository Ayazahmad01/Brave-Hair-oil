import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    ml: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ["oil", "shampoo"], required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    sizes: [sizeSchema],
    // isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
