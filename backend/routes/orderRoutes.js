import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";
import { notifyOwnerOnWhatsApp } from "../utils/sendWhatsApp.js";
import { generateInvoicePDF } from "../utils/generateInvoice.js";

const router = express.Router();

// POST /api/orders - place a new order
router.post("/", protect, async (req, res) => {
  try {
    const { items, customerName, phone, address, city, notes } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      customerName,
      phone,
      address,
      city,
      notes,
    });

    // Fire-and-forget WhatsApp notification to the shop owner
    notifyOwnerOnWhatsApp(order);

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/mine - logged-in user's own order history
router.get("/mine", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/recent - anonymized public feed ("other people who ordered")
router.get("/recent", async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select("city items createdAt status");

    // strip anything identifying before sending to the public
    const publicFeed = orders.map((o) => ({
      city: o.city,
      itemSummary: o.items.map((i) => `${i.productName} (${i.size})`).join(", "),
      status: o.status,
      createdAt: o.createdAt,
    }));

    res.json(publicFeed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/:id/invoice - download PDF bill
router.get("/:id/invoice", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });
    if (String(order.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to view this invoice." });
    }
    generateInvoicePDF(order, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
