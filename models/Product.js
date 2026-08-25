const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: [
        "rings",
        "necklaces",
        "earrings",
        "bracelets",
        "pendants",
        "wedding",
        "engagement",
      ],
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String, required: true },
    shortDescription: { type: String },
    images: [{ type: String }],
    videoUrl: { type: String },
    material: { type: String },
    gemstone: { type: String },
    weight: { type: String },
    dimensions: { type: String },
    sku: { type: String, unique: true },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        user: String,
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
