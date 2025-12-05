import React from "react";
import Card from "../components/Card";

const sampleMenu = [
  { id:1, title:"Sushi Platter", price:"$12.99", img:"https://img.freepik.com/premium-photo/gourmet-sushi-platter-with-champagne_711700-20016.jpg", excerpt:"Fresh sashimi" },
  { id:2, title:"Ramen Bowl", price:"$9.99", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQoMvyuEUh95aXnnj4ekiXB9dBMF1QNmUvsw&s", excerpt:"Slow cooked broth" },
  { id:3, title:"Gyoza Kit", price:"$6.50", img:"https://dmlxzvnzyohme.cloudfront.net/2015/12/_768xAUTO_crop_center-center_none_ns/chicken-mushroom-gyoza-640x360.jpg", excerpt:"Pan-fry at home" },
  { id:4, title:"Bento Kit", price:"$10.50", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwYyQobT1apaTx0Ay0ZbzOvk771-QtEVdK3g&s", excerpt:"Balanced meal" }
];

export default function Menu(){
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-center">Our Menu</h1>
      <p className="text-center text-gray-600 mt-2">Choose single-serving ingredient kits and ready-to-cook meals.</p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {sampleMenu.map(it => <Card key={it.id} {...it} />)}
      </div>
    </div>
  );
}
