require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).catch(() => {});

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

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
  res.json({ status: "ok" });
});

app.get("/api", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
