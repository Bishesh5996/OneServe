import React from "react";
import { useParams, Link } from "react-router-dom";

export default function BlogDetail(){
  const { id } = useParams();
  // for demo we just show a static article; replace with API fetch by id
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold">The secret tips to prepare a perfect ramen</h1>
      <div className="mt-4 text-sm text-gray-600">by OneServe — 2025</div>
      <img src="/images/blog-detail.jpg" className="mt-6 w-full h-64 object-cover rounded" />
      <article className="mt-6 prose prose-sm">
        <p>Full article content goes here. Use this area to describe how to make the perfect ramen, step by step.</p>
        <p>…</p>
      </article>

      <div className="mt-8">
        <h4 className="font-semibold">Read More Articles</h4>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <Link to="/blog" className="block">
            <img src="/images/blog1.jpg" className="h-24 w-full object-cover rounded" />
            <div className="mt-2 text-sm">The secret tips to prepare a perfect ramen</div>
          </Link>
          <Link to="/blog" className="block">
            <img src="/images/blog2.jpg" className="h-24 w-full object-cover rounded" />
            <div className="mt-2 text-sm">How to choose sushi rice</div>
          </Link>
          <Link to="/blog" className="block">
            <img src="/images/blog3.jpg" className="h-24 w-full object-cover rounded" />
            <div className="mt-2 text-sm">Top condiments for tempura</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
