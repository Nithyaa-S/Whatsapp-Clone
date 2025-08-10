// server.js
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Simple home route
app.get("/", (req, res) => {
  res.send("🚀 WhatsApp Webhook Server Running");
});

// ✅ Webhook verification (GET)
app.get("/webhook", (req, res) => {
  const verifyToken = process.env.WEBHOOK_SECRET; // Set in Render

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === verifyToken) {
      console.log("✅ WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// ✅ Webhook event listener (POST)
app.post("/webhook", (req, res) => {
  const body = req.body;

  console.log("📩 Incoming webhook:", JSON.stringify(body, null, 2));

  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value &&
      body.entry[0].changes[0].value.messages
    ) {
      const message = body.entry[0].changes[0].value.messages[0];
      console.log("💬 Message received:", message);
    }
    res.sendStatus(200); // WhatsApp needs 200 OK
  } else {
    res.sendStatus(404);
  }
});

// ✅ Use Render's PORT or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
