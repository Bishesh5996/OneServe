require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const menuRoutes = require("./routes/menu");
const blogRoutes = require("./routes/blog");
const contactRoutes = require("./routes/contact");

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/restaurantdb";
connectDB(MONGO_URI).catch(err => console.error(err));

// routes
app.use("/api/menu", menuRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);

// serve images if desired
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
