require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;

let dbConnected = false;

async function connectToDB() {
  if (dbConnected) return;
  if (!MONGODB_URI) {
    console.log("No MONGODB_URI found");
    return;
  }
  await mongoose.connect(MONGODB_URI);
  dbConnected = true;
  console.log("MongoDB connected on Vercel");
}

// Wait for DB on every request
app.use(async (req, res, next) => {
  try {
    await connectToDB();
  } catch (err) {
    console.error("DB connection error:", err.message);
  }
  next();
});

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const productsRouter = require("../routes/products");
const authRouter = require("../routes/auth");
const ordersRouter = require("../routes/orders");
const paymentRouter = require("../routes/payment");
const adminRouter = require("../routes/admin");
const cardsRouter = require("../routes/cards");

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cards", cardsRouter);

app.get("/", (req, res) => {
  res.json({ status: "ok", db: dbConnected });
});

app.get("/api", (req, res) => {
  res.json({ status: "ok", db: dbConnected });
});

module.exports = app;
