const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const { category, search, featured, bestSeller, newArrival, sort, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (featured === "true") filter.featured = true;
    if (bestSeller === "true") filter.bestSeller = true;
    if (newArrival === "true") filter.newArrival = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      const s = search.toLowerCase();
      filter.$or = [
        { name: { $regex: s, $options: "i" } },
        { description: { $regex: s, $options: "i" } },
        { tags: { $regex: s, $options: "i" } },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_low") sortOption = { price: 1 };
    else if (sort === "price_high") sortOption = { price: -1 };
    else if (sort === "rating") sortOption = { rating: -1 };

    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/featured", async (req, res) => {
  const products = await Product.find({ featured: true }).limit(8);
  res.json(products);
});

router.get("/best-sellers", async (req, res) => {
  const products = await Product.find({ bestSeller: true }).limit(8);
  res.json(products);
});

router.get("/new-arrivals", async (req, res) => {
  const products = await Product.find({ newArrival: true }).sort({ createdAt: -1 }).limit(8);
  res.json(products);
});

router.get("/categories", async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
});

router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
