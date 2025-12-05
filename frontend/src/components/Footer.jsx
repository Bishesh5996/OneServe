import React from "react";

export default function Footer(){
  return (
    <footer className="mt-12 bg-footerOrange text-white">
      <div className="container py-10 flex flex-col md:flex-row md:justify-between gap-6">
        <div className="max-w-md">
          <h3 className="font-bold text-lg">OneServe</h3>
          <p className="mt-2 text-sm">Single-serving ingredient kits — measured perfectly for one-time cooking perfection.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold">Menu</h4>
            <ul className="mt-2 space-y-1">
              <li>Sushi</li>
              <li>Ramen</li>
              <li>Bowls</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Contact</h4>
            <p className="mt-2">email@oneserve.com</p>
            <p>+977-98x-xxxxxx</p>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-24 h-16 bg-white rounded overflow-hidden" />
            <div className="w-24 h-16 bg-white rounded overflow-hidden" />
          </div>
        </div>
      </div>

      <div className="bg-deepOrange text-sm py-3 text-center">© {new Date().getFullYear()} OneServe</div>
    </footer>
  );
}
