require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

async function updateRatings() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    const ratings = {
      "celestial-diamond-solitaire-ring": 4.9,
      "sapphire-halo-pendant-necklace": 4.7,
      "ruby-blossom-earrings": 4.8,
      "emerald-tennis-bracelet": 5.0,
      "pearl-cascade-chandelier-earrings": 4.6,
      "eternal-love-wedding-band": 4.9,
      "tanzanite-three-stone-ring": 4.5,
      "diamond-riviera-necklace": 5.0,
    };

    for (const [slug, rating] of Object.entries(ratings)) {
      const result = await Product.updateOne({ slug }, { $set: { rating } });
      console.log(`${slug}: ${result.modifiedCount > 0 ? 'updated' : 'no change'}`);
    }

    await mongoose.connection.close();
    console.log("Done!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

updateRatings();
