require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const ALLOWED_ORIGINS = [
  "https://luxegem-pi.vercel.app",
  "http://localhost:3000",
];

let dbConnected = false;

async function connectToDB() {
  if (dbConnected) return;
  if (!MONGODB_URI) return;
  await mongoose.connect(MONGODB_URI);
  dbConnected = true;
}

app.use(async (req, res, next) => {
  try { await connectToDB(); } catch (e) { console.error("DB error:", e.message); }
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "1mb" }));

const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, message: { error: "Too many requests, try later" } });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { error: "Too many login attempts" } });
const orderLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10, message: { error: "Too many orders" } });

app.use(globalLimiter);

app.use("/api/auth", authLimiter, require("../routes/auth"));
app.use("/api/orders", orderLimiter, require("../routes/orders"));
app.use("/api/products", require("../routes/products"));
app.use("/api/payment", require("../routes/payment"));
app.use("/api/admin", require("../routes/admin"));
app.use("/api/cards", require("../routes/cards"));

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
