import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function Home(){
  const sampleMenu = [
    { id:1, title:"Sushi Platter", price:"$12.99", img:"https://img.freepik.com/premium-photo/gourmet-sushi-platter-with-champagne_711700-20016.jpg", excerpt:"Fresh daily" },
    { id:2, title:"Ramen Bowl", price:"$9.99", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQoMvyuEUh95aXnnj4ekiXB9dBMF1QNmUvsw&s", excerpt:"Rich broth" },
    { id:3, title:"OneServe Kit", price:"$8.50", img:"https://cdn.prod.website-files.com/640b91d643138c69d62745bb/66bc41ab051d5ee66af1b71a_lunchbox2.webp", excerpt:"Single-serving kit" }
  ];

  return (
    <div className="container py-8 max-w-3xl"> {/* narrow column to mimic screenshot */}
      {/* HERO */}
      <div className="relative mb-8">
        <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" alt="hero" className="w-full h-56 object-cover rounded-lg"/>
        <div className="absolute inset-0 flex items-center">
          <div className="px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">OneServe — Perfect single-serving kits</h1>
            <p className="mt-2 text-white/90 max-w-md">OneServe is a digital platform designed to revolutionize home cooking by providing single-serving ingredient kits with precisely measured portions.</p>
            <Link to="/menu" className="inline-block mt-4 px-5 py-2 bg-orangeAccent text-white rounded">Browse Menu</Link>
          </div>
        </div>
      </div>

      {/* feature icons row */}
      <div className="bg-white p-6 rounded mb-8 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xl font-semibold">Measured</div>
          <div className="text-sm text-gray-600 mt-1">Perfect single servings</div>
        </div>
        <div>
          <div className="text-xl font-semibold">Fresh</div>
          <div className="text-sm text-gray-600 mt-1">Daily sourced</div>
        </div>
        <div>
          <div className="text-xl font-semibold">Convenient</div>
          <div className="text-sm text-gray-600 mt-1">Easy recipes</div>
        </div>
      </div>

      {/* promotional block */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded flex items-center gap-4">
          <img src="https://images.unsplash.com/photo-1645517976245-569a91016f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NjQ2NTkxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" className="w-28 h-28 object-cover rounded" />
          <div>
            <h3 className="font-semibold">We provide healthy food for your family</h3>
            <p className="text-sm text-gray-600 mt-1">Exactly-measured single serving ingredient kits so you never waste food.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded">
          <h3 className="font-semibold">We also offer unique services for your events</h3>
          <p className="mt-2 text-sm text-gray-600">Catering with per-person pre-portioned kits — great for office lunches and small gatherings.</p>
        </div>

        <div className="bg-white p-6 rounded">
          <h2 className="text-2xl font-semibold">Our Menu</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {sampleMenu.map(item => <Card key={item.id} {...item} />)}
          </div>
        </div>

        <div className="bg-white p-6 rounded">
          <h2 className="text-xl font-semibold">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 mt-4 gap-4">
            <div className="p-4 border rounded text-sm">"Love the convenience!"</div>
            <div className="p-4 border rounded text-sm">"Zero waste household." </div>
            <div className="p-4 border rounded text-sm">"Easy to follow recipe cards."</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded">
          <h2 className="text-xl font-semibold">Our Blog & Articles</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <Link to="/blog" className="block">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQoMvyuEUh95aXnnj4ekiXB9dBMF1QNmUvsw&s" className="h-32 w-full object-cover rounded" />
              <h4 className="mt-2 font-semibold">The secret to perfect ramen</h4>
            </Link>
            <Link to="/blog" className="block">
              <img src="https://img.freepik.com/premium-photo/gourmet-sushi-platter-with-champagne_711700-20016.jpg" className="h-32 w-full object-cover rounded" />
              <h4 className="mt-2 font-semibold">How to choose sushi rice</h4>
            </Link>
            <Link to="/blog" className="block">
              <img src="https://img.taste.com.au/ZT9GGty1/taste/2016/11/tempura-49031-1.jpeg" className="h-32 w-full object-cover rounded" />
              <h4 className="mt-2 font-semibold">Top condiments for tempura</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
