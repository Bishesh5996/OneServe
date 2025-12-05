import React from "react";

export default function About(){
  return (
    <div className="container py-12 max-w-3xl">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl font-bold">About OneServe</h1>
          <p className="mt-4 text-gray-700">We provide healthy food for your family. OneServe measures the exact ingredients for a single serving — no waste, no hassle.</p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded text-center">
              <div className="font-bold text-2xl">3+</div>
              <div className="text-sm text-gray-600">Years</div>
            </div>
            <div className="bg-white p-4 rounded text-center">
              <div className="font-bold text-2xl">100K</div>
              <div className="text-sm text-gray-600">Kits sold</div>
            </div>
            <div className="bg-white p-4 rounded text-center">
              <div className="font-bold text-2xl">95%</div>
              <div className="text-sm text-gray-600">Happy customers</div>
            </div>
          </div>
        </div>

        <div>
          <img src="https://www.shutterstock.com/image-photo/eating-wide-variety-nutritious-foods-260nw-2313837293.jpg" alt="about" className="rounded w-full h-72 object-cover" />
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded">
        <h3 className="font-semibold">What Our Customers Say</h3>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded">“Super convenient.”</div>
          <div className="p-4 border rounded">“Saved me time.”</div>
          <div className="p-4 border rounded">“Great flavors.”</div>
        </div>
      </div>
    </div>
  );
}
