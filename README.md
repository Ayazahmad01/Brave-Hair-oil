# Brave Hair Oil — Full MERN E-commerce Site

A complete starter project for your brand, built with MongoDB, Express, React (Vite), and Node.

## What's included

| Feature you asked for | Where it lives |
|---|---|
| Signup / Login connected to MongoDB | `backend/routes/authRoutes.js`, `frontend/src/pages/Login.jsx` & `Signup.jsx` |
| Product page (oil + shampoo, 3 sizes each) | `frontend/src/pages/Home.jsx`, `backend/seed/seedProducts.js` |
| Add to cart | `frontend/src/context/CartContext.jsx` |
| Checkout form → saved to MongoDB | `frontend/src/pages/Checkout.jsx`, `backend/routes/orderRoutes.js` |
| Download printable bill/invoice (PDF) | `backend/utils/generateInvoice.js` |
| WhatsApp notification to you on new order | `backend/utils/sendWhatsApp.js` |
| Delivery time + "others who ordered" feed | `frontend/src/pages/DeliveryTracker.jsx` |
| Order history for each user | `frontend/src/pages/OrderHistory.jsx` |
| Lucky spin wheel (cash / oil / shampoo / iPhone) | `frontend/src/pages/SpinWheel.jsx` |

Prices are already set as you asked: Oil — Rs.500 / 800 / 1000, Shampoo — Rs.1000 / 2000 / 3000.

---

## 1. What you need to create yourself first (free accounts)

I can't create these *for* you — they need your own email/phone to register — but they're free and take about 15 minutes total.

1. **MongoDB Atlas** (your database): https://www.mongodb.com/cloud/atlas/register
   - Create a free (M0) cluster → Database Access (create a user/password) → Network Access (allow 0.0.0.0/0 for now) → "Connect" → "Drivers" → copy the connection string.
2. **WhatsApp Cloud API** (for order notifications to your phone): https://developers.facebook.com
   - Create a Meta App → add the "WhatsApp" product → it gives you a **temporary access token**, a **test phone number ID**, and lets you add your own number as a verified tester recipient.
   - This is enough to test. For permanent use later, WhatsApp requires business verification — for now the test setup works fine to send you order alerts.
3. A code editor (VS Code) and Node.js installed (v18 or newer) — https://nodejs.org

---

## 2. Backend setup

```bash
cd backend
cp .env.example .env
# open .env and paste in your MONGO_URI, a random JWT_SECRET, and your WhatsApp details
npm install
npm run seed     # loads your Oil + Shampoo products into MongoDB
npm run dev       # starts the API on http://localhost:5000
```

## 3. Frontend setup

Open a **second terminal**:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev       # starts the site on http://localhost:5173
```

Visit `http://localhost:5173` — sign up, browse products, add to cart, checkout, download your invoice, spin the wheel.

---

## 4. How each tricky feature works

- **WhatsApp alert**: when an order is placed, the backend calls `notifyOwnerOnWhatsApp()`, which sends a message to *your* number (`OWNER_WHATSAPP_NUMBER` in `.env`) via Meta's API. If you haven't filled in the WhatsApp env vars yet, it just skips silently and logs a note — it won't break checkout.
- **Invoice/bill**: generated live as a PDF using `pdfkit`, no third-party invoice service needed. Customers can download it right after ordering or anytime from "My Orders."
- **"Other people who ordered"**: pulls the 10 most recent orders but only exposes city + item name — never names, phone numbers, or addresses, to protect customer privacy.
- **Spin wheel**: pure front-end logic with weighted odds you can tune in `SpinWheel.jsx` (see the `PRIZES` array — change `weight` to make a prize more/less likely). Right now it limits each *browser* to one spin — good enough to launch, but see the improvement note below.

---

## 5. Before you go live — a few honest notes

- **Spin-wheel limit is per-browser, not per-account.** Someone could clear their browser data and spin again. If that matters to you, I can move the "has this user spun" flag into MongoDB on the User model — just ask.
- **Order status** (Pending → Confirmed → Out for Delivery → Delivered) currently has to be updated manually in MongoDB Atlas (or I can build you a simple owner dashboard page to update it with one click — worth doing before launch).
- **Hosting**: for a live site, a simple free/cheap combo is:
  - Backend → Render.com or Railway.app
  - Frontend → Vercel or Netlify
  - Database → MongoDB Atlas (already free)
  I can walk you through deployment step-by-step whenever you're ready.
- **Payments**: right now this is Cash on Delivery style (order placed, you deliver, customer pays). If you later want online payment (JazzCash, Easypaisa, Stripe), that's a separate integration — let me know and I'll add it.

---

## 6. My honest guidance for making this successful

1. **Launch with COD only** — don't block your launch waiting on payment gateway approval. Pakistani customers are very comfortable with cash on delivery.
2. **Get the owner dashboard next** — you'll want a simple private page to see new orders and mark them "Delivered" without opening MongoDB directly.
3. **Real product photos** — replace the placeholder oil/shampoo icons with real bottle photos; it's the single biggest trust factor for a new brand.
4. **Test WhatsApp end-to-end before launch day** — place a test order yourself and confirm the message actually reaches your phone.
5. **Back up your MongoDB data** periodically once real orders start coming in (Atlas has automatic backups on paid tiers).

I'm glad to help you with any of this next — the owner dashboard, deployment, payment integration, or fixing any bug you hit. Just tell me what's happening and paste the error if there is one.
