"use client";
import { useEffect, useState } from "react";

export default function UrgencyTimer() {
  const initialMinutes = 180; // 3 hours
  const resetAfter = initialMinutes * 60 * 1000;

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const now = Date.now();
    const storedStart = localStorage.getItem("urgency-timer-start");

    let startTime;

    if (storedStart) {
      const elapsed = now - parseInt(storedStart);
      if (elapsed >= resetAfter) {
        startTime = now;
        localStorage.setItem("urgency-timer-start", now.toString());
      } else {
        startTime = parseInt(storedStart);
      }
    } else {
      startTime = now;
      localStorage.setItem("urgency-timer-start", now.toString());
    }

    const updateTimeLeft = () => {
      const newNow = Date.now();
      const elapsed = newNow - startTime;
      const remaining = Math.max(0, Math.floor((resetAfter - elapsed) / 1000));
      setTimeLeft(remaining);
    };

    updateTimeLeft(); // Set immediately
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null) {
    return null; // or a spinner if you want
  }

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-white px-6 py-4 rounded-xl shadow-lg w-full max-w-xl mx-auto my-6 flex flex-col sm:flex-row justify-between items-center animate-pulse hover:animate-none transition-all duration-300">
      <div className="text-lg sm:text-xl font-semibold mb-2 sm:mb-0">
        ⚡ Limited Time Offer Ends In:
      </div>
      <div className="font-mono text-2xl sm:text-3xl bg-white text-red-600 rounded px-4 py-2 tracking-widest shadow-inner">
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
}
