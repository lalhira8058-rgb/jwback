require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error:", err.message);
  }
}

connectDB();

const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const ordersRouter = require("./routes/orders");
const paymentRouter = require("./routes/payment");
const adminRouter = require("./routes/admin");
const cardsRouter = require("./routes/cards");

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cards", cardsRouter);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Luxe Gem API Running" });
});

app.get("/api", (req, res) => {
  res.json({ status: "ok", message: "Luxe Gem API Running" });
});

module.exports = app;
