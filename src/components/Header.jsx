"use client"
import { useState } from 'react';

export default function ProductHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-3xl font-bold text-gray-900">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Water Spray
          </span>
        </h1>
      </div>
    </header>
  );
}