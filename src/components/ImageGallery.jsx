"use client";
import { useState } from "react";

export default function ImageGalleryWithOrderForm({ images = [] }) {
  const defaultImages = [
    "https://via.placeholder.com/600x400?text=Image+1",
    "https://via.placeholder.com/600x400?text=Image+2",
    "https://via.placeholder.com/600x400?text=Image+3",
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;
  const [selected, setSelected] = useState(galleryImages[0]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-xl rounded-xl">
      {/* Main Image */}
      <img
        src={selected}
        alt="Selected"
        className="w-full h-80 object-cover rounded-lg mb-4 transition duration-300 ease-in-out"
      />

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto mb-6">
        {galleryImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx}`}
            onClick={() => setSelected(img)}
            className={`h-20 w-20 object-cover rounded-md cursor-pointer border-2 ${
              selected === img ? "border-blue-500" : "border-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Order Now Button */}
      <div className="text-center">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-200"
        >
          Order Now
        </button>
      </div>

      {/* Conditional Form */}
      {showForm && (
        <form className="mt-6 space-y-4 border-t pt-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Your Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="03XX-XXXXXXX"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Address</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Street, Area, City"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Submit Order
          </button>
        </form>
      )}
    </div>
  );
}
