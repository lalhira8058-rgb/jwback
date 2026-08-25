require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");

const products = [
  {
    name: "Celestial Diamond Solitaire Ring",
    slug: "celestial-diamond-solitaire-ring",
    category: "engagement",
    price: 2499,
    originalPrice: 2999,
    description: "A breathtaking 1.5 carat round brilliant diamond set in 18K white gold. This celestial solitaire features exceptional clarity and brilliance that captures light from every angle. The classic six-prong setting elevates the diamond, creating a timeless piece that symbolizes eternal love.",
    shortDescription: "1.5ct Round Brilliant Diamond, 18K White Gold",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600"
    ],
    material: "18K White Gold",
    gemstone: "Diamond",
    weight: "5.2g",
    dimensions: "Size 7 (adjustable)",
    sku: "CEL-DMN-RNG-001",
    stock: 15,
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.9,
    reviews: [],
    tags: ["diamond", "engagement", "solitaire", "white gold"],
  },
  {
    name: "Sapphire Halo Pendant Necklace",
    slug: "sapphire-halo-pendant-necklace",
    category: "necklaces",
    price: 1899,
    originalPrice: 2199,
    description: "A mesmerizing 2-carat blue sapphire surrounded by a halo of brilliant diamonds on a delicate 14K white gold chain. The deep blue sapphire evokes the depths of the ocean, while the diamond halo adds extra sparkle and elegance.",
    shortDescription: "2ct Blue Sapphire, Diamond Halo, 14K White Gold",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
      "https://images.unsplash.com/photo-1515562141589-67f0d924e4d4?w=600"
    ],
    material: "14K White Gold",
    gemstone: "Sapphire",
    weight: "3.8g",
    dimensions: "18 inch chain",
    sku: "SAP-HAL-NEK-001",
    stock: 20,
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 4.8,
    reviews: [],
    tags: ["sapphire", "necklace", "pendant", "halo"],
  },
  {
    name: "Ruby Blossom Earrings",
    slug: "ruby-blossom-earrings",
    category: "earrings",
    price: 1299,
    originalPrice: 1599,
    description: "Delicate blossom-shaped earrings featuring vibrant 0.8 carat rubies set in rose gold. Each petal is accented with tiny diamonds, creating a floral design that's both feminine and sophisticated. Perfect for special occasions or adding a touch of luxury to everyday wear.",
    shortDescription: "0.8ct Ruby, Rose Gold, Diamond Accents",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600"
    ],
    material: "14K Rose Gold",
    gemstone: "Ruby",
    weight: "2.4g",
    dimensions: "25mm drop",
    sku: "RBY-BLS-EAR-001",
    stock: 25,
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.7,
    reviews: [],
    tags: ["ruby", "earrings", "rose gold", "floral"],
  },
  {
    name: "Emerald Tennis Bracelet",
    slug: "emerald-tennis-bracelet",
    category: "bracelets",
    price: 3499,
    originalPrice: 3999,
    description: "A stunning tennis bracelet featuring 5 carats of matched Colombian emeralds set in 18K yellow gold. Each emerald is carefully selected for its rich green color and excellent clarity. The secure box clasp ensures comfortable and worry-free wear.",
    shortDescription: "5ct Colombian Emeralds, 18K Yellow Gold",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600"
    ],
    material: "18K Yellow Gold",
    gemstone: "Emerald",
    weight: "18.5g",
    dimensions: "7 inches",
    sku: "EMR-TNS-BRC-001",
    stock: 10,
    featured: false,
    bestSeller: true,
    newArrival: false,
    rating: 4.9,
    reviews: [],
    tags: ["emerald", "bracelet", "tennis", "gold"],
  },
  {
    name: "Pearl Cascade Chandelier Earrings",
    slug: "pearl-cascade-chandelier-earrings",
    category: "earrings",
    price: 799,
    originalPrice: 999,
    description: "Elegant chandelier earrings featuring a cascade of freshwater pearls in graduating sizes. Set in sterling silver with a rhodium finish for lasting shine. These statement earrings move beautifully, catching light with every turn.",
    shortDescription: "Freshwater Pearls, Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600"
    ],
    material: "Sterling Silver",
    gemstone: "Pearl",
    weight: "6.2g",
    dimensions: "50mm drop",
    sku: "PRL-CSC-EAR-001",
    stock: 30,
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 4.6,
    reviews: [],
    tags: ["pearl", "earrings", "chandelier", "silver"],
  },
  {
    name: "Eternal Love Wedding Band",
    slug: "eternal-love-wedding-band",
    category: "wedding",
    price: 1199,
    originalPrice: 1499,
    description: "A classic eternity band featuring 2 carats of round brilliant diamonds channel-set in platinum. The continuous circle of diamonds symbolizes never-ending love. Comfort-fit design ensures this ring can be worn beautifully every day.",
    shortDescription: "2ct Diamonds, Platinum, Eternity Band",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600"
    ],
    material: "Platinum",
    gemstone: "Diamond",
    weight: "6.8g",
    dimensions: "Size 7 (adjustable)",
    sku: "ETL-WBG-RNG-001",
    stock: 12,
    featured: false,
    bestSeller: true,
    newArrival: false,
    rating: 4.8,
    reviews: [],
    tags: ["wedding", "band", "eternity", "platinum"],
  },
  {
    name: "Tanzanite Three-Stone Ring",
    slug: "tanzanite-three-stone-ring",
    category: "rings",
    price: 2199,
    originalPrice: 2599,
    description: "A magnificent three-stone ring featuring a 1.2ct tanzanite flanked by two 0.5ct diamonds. Set in 14K white gold, this ring represents past, present, and future. The vivid blue-violet tanzanite is a rare gemstone found only in Tanzania.",
    shortDescription: "1.2ct Tanzanite, Diamond Accents, 14K White Gold",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600"
    ],
    material: "14K White Gold",
    gemstone: "Tanzanite",
    weight: "4.5g",
    dimensions: "Size 7 (adjustable)",
    sku: "TZT-3ST-RNG-001",
    stock: 8,
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 4.7,
    reviews: [],
    tags: ["tanzanite", "three-stone", "ring", "white gold"],
  },
  {
    name: "Diamond Riviera Necklace",
    slug: "diamond-riviera-necklace",
    category: "necklaces",
    price: 4999,
    originalPrice: 5999,
    description: "A luxurious riviera necklace featuring 8 carats of round brilliant diamonds set in 18K white gold. The graduated diamond design creates a stunning waterfall effect. Each diamond is hand-selected for exceptional fire and brilliance.",
    shortDescription: "8ct Total Diamonds, 18K White Gold, Riviera Style",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600"
    ],
    material: "18K White Gold",
    gemstone: "Diamond",
    weight: "22.3g",
    dimensions: "16 inch choker length",
    sku: "DMN-RVR-NEK-001",
    stock: 5,
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 5.0,
    reviews: [],
    tags: ["diamond", "necklace", "riviera", "luxury"],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    await Product.deleteMany({});
    await User.deleteMany({});
    console.log("Old data cleared");

    await Product.insertMany(products);
    console.log(`${products.length} products seeded`);

    await User.create({
      name: "Admin",
      email: "admin@jellery.com",
      password: "admin123",
      role: "admin",
    });
    console.log("Admin user created");
    console.log("Admin login: admin@jellery.com / admin123");

    await mongoose.connection.close();
    console.log("Done!");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
