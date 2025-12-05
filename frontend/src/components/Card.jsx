import React from "react";

export default function Card({title, price, img, excerpt, onClick}){
  return (
    <div className="bg-white rounded overflow-hidden card-shadow">
      <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img src={img} alt={title} className="w-full object-cover"/>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <div className="text-orangeAccent font-bold">{price}</div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{excerpt}</p>
      </div>
    </div>
  );
}
