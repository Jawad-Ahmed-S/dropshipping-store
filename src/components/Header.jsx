"use client";
import Image from 'next/image';
import { useState } from 'react';

export default function ProductHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-center items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="mr-2"
        />
        {/* <h1 className="text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          Your Brand Name
        </h1> */}
      </div>
    </header>
  );
}
