import axios from "axios";

// Sends a WhatsApp message to YOU (the shop owner) whenever a new order comes in.
// Needs WHATSAPP_TOKEN + WHATSAPP_PHONE_NUMBER_ID from Meta's WhatsApp Cloud API,
// and OWNER_WHATSAPP_NUMBER (your own number) in .env
export const notifyOwnerOnWhatsApp = async (order) => {
  const { WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, OWNER_WHATSAPP_NUMBER } = process.env;

  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !OWNER_WHATSAPP_NUMBER) {
    console.log("WhatsApp not configured yet - skipping notification. See .env.example.");
    return;
  }

  const itemsText = order.items
    .map((i) => `- ${i.productName} (${i.size}) x${i.quantity} = Rs.${i.price * i.quantity}`)
    .join("\n");

  const message =
    `New order on Brave Hair Oil!\n\n` +
    `Customer: ${order.customerName}\n` +
    `Phone: ${order.phone}\n` +
    `Address: ${order.address}, ${order.city}\n\n` +
    `Items:\n${itemsText}\n\n` +
    `Total: Rs.${order.totalAmount}\n` +
    `Order ID: ${order._id}`;

  try {
    await axios.post(
      `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: OWNER_WHATSAPP_NUMBER,
        type: "text",
        text: { body: message },
      },
      { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
    );
    console.log("WhatsApp notification sent to owner.");
  } catch (err) {
    console.error("WhatsApp notification failed:", err.response?.data || err.message);
  }
};
