import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();
await connectDB();

const products = [
  {
    name: "Brave Hair Oil",
    category: "oil",
    description: "Nourishing herbal hair oil for stronger, healthier hair.",
    image: "",
    sizes: [
      { label: "Small", ml: "50ml", price: 500 },
      { label: "Medium", ml: "100ml", price: 800 },
      { label: "Large", ml: "200ml", price: 1000 },
    ],
  },
  {
    name: "Brave Shampoo",
    category: "shampoo",
    description: "Gentle daily shampoo made to work with Brave Hair Oil.",
    image: "",
    sizes: [
      { label: "Small", ml: "100ml", price: 1000 },
      { label: "Medium", ml: "200ml", price: 2000 },
      { label: "Large", ml: "400ml", price: 3000 },
    ],
  },
];

await Product.deleteMany({});
await Product.insertMany(products);
console.log("Products seeded successfully.");
process.exit();
