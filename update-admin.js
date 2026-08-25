require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function updateAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    // Delete old admin
    const deleted = await User.deleteMany({ email: "admin@jellery.com" });
    console.log(`Deleted old admin: ${deleted.deletedCount} user(s)`);

    // Check if new admin exists
    const exists = await User.findOne({ email: "Doremon111@gmail.com" });
    if (exists) {
      console.log("New admin already exists, skipping creation");
    } else {
      await User.create({
        name: "Admin",
        email: "Doremon111@gmail.com",
        password: "Nobita@111",
        role: "admin",
      });
      console.log("New admin created: Doremon111@gmail.com / Nobita@111");
    }

    await mongoose.connection.close();
    console.log("Done!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

updateAdmin();
