import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded bg-orangeAccent flex items-center justify-center text-white font-bold">OS</div>
          <div className="text-lg font-semibold">OneServe</div>
        </Link>

        <nav className="space-x-6 text-sm text-gray-700 hidden md:flex">
          <Link to="/" className="hover:text-orangeAccent">Homepage</Link>
          <Link to="/about" className="hover:text-orangeAccent">About</Link>
          <Link to="/menu" className="hover:text-orangeAccent">Menu</Link>
          <Link to="/blog" className="hover:text-orangeAccent">Blog</Link>
          <Link to="/contact" className="hover:text-orangeAccent">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
