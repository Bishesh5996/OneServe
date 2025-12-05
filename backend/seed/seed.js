const mongoose = require("mongoose");
const connectDB = require("../config/db");
const MenuItem = require("../models/MenuItem");
const BlogPost = require("../models/BlogPost");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/restaurantdb";

const menu = [
  { title:"Sushi Platter", price:"$12.99", category:"Sushi", description:"Fresh sushi selection", image:"/images/sushi.jpg" },
  { title:"Ramen Bowl", price:"$9.99", category:"Ramen", description:"Rich broth and noodles", image:"/images/ramen.jpg" },
  { title:"Gyoza", price:"$6.50", category:"Sides", description:"Pan-fried dumplings", image:"/images/gyoza.jpg" }
];

const posts = [
  { title:"The secret tips to prepare a perfect ramen", slug:"perfect-ramen", excerpt:"Learn the secrets behind ramen broth.", body:"<p>Full article here</p>", image:"/images/blog1.jpg" },
  { title:"How to choose sushi rice", slug:"sushi-rice", excerpt:"Why rice matters", body:"<p>Full article here</p>", image:"/images/blog2.jpg" }
];

async function seed(){
  await connectDB(MONGO_URI);
  await MenuItem.deleteMany({});
  await BlogPost.deleteMany({});
  await MenuItem.insertMany(menu);
  await BlogPost.insertMany(posts);
  console.log("Seeded DB");
  process.exit(0);
}

seed().catch(err => console.error(err));
