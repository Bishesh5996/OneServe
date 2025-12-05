import React, { useState } from "react";

export default function Contact(){
  const [form, setForm] = useState({name:"", email:"", phone:"", message:""});

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value});
  }

  function handleSubmit(e){
    e.preventDefault();
    // send to backend with axios/post later
    alert("Form submitted (demo)");
  }

  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="text-gray-600 mt-2">Have questions? Send us a message.</p>

      <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded">
        <div className="grid md:grid-cols-2 gap-4">
          <input name="name" onChange={handleChange} value={form.name} placeholder="Name" className="border p-3 rounded" />
          <input name="email" onChange={handleChange} value={form.email} placeholder="Email" className="border p-3 rounded" />
        </div>
        <input name="phone" onChange={handleChange} value={form.phone} placeholder="Phone" className="border p-3 rounded mt-4 w-full" />
        <textarea name="message" onChange={handleChange} value={form.message} placeholder="Message" className="border p-3 rounded mt-4 w-full" rows="5" />
        <button className="mt-4 px-6 py-2 bg-orangeAccent text-white rounded">Send Message</button>
      </form>
    </div>
  );
}
