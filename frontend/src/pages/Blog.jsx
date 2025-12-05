import React from "react";
import { Link } from "react-router-dom";

const posts = [
  { id: "1", title: "The secret tips to prepare a perfect ramen", excerpt:"Learn the secrets...", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQoMvyuEUh95aXnnj4ekiXB9dBMF1QNmUvsw&s "},
  { id: "2", title: "How to choose sushi rice", excerpt:"Rice matters", img:"https://img.freepik.com/premium-photo/gourmet-sushi-platter-with-champagne_711700-20016.jpg" },
  { id: "3", title: "Top condiments for tempura", excerpt:"Tasty condiments", img:"https://img.taste.com.au/ZT9GGty1/taste/2016/11/tempura-49031-1.jpeg" },
];

export default function Blog(){
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-center">Our Blog & Articles</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {posts.map(p => (
          <Link key={p.id} to={`/blog/${p.id}`} className="bg-white rounded overflow-hidden card-shadow">
            <img src={p.img} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
