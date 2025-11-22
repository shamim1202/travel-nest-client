"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Luxury Beachfront Stay",
    desc: "Experience the ultimate relaxation with stunning ocean views, pristine beaches, and world-class amenities at our beachfront hotels.",
    image: "https://i.ibb.co.com/C38jwFky/Luxury-Beachfront-Stay.jpg",
  },
  {
    title: "City Center Retreat",
    desc: "Stay in the heart of the city with modern comforts, nearby attractions, and easy access to shopping, dining, and entertainment.",
    image: "https://i.ibb.co.com/MDyHNSFg/city-skyline-hotel.jpg",
  },
  {
    title: "Mountain Adventure Lodge",
    desc: "Enjoy breathtaking mountain landscapes, adventurous trails, and cozy lodge experiences for a perfect nature getaway.",
    image: "https://i.ibb.co.com/KxZHcjfb/mountain-view-hotel.jpg",
  },
  {
    title: "Romantic Getaways",
    desc: "Escape with your loved one to serene locations with intimate settings, candlelight dinners, and luxurious suites.",
    image: "https://i.ibb.co.com/F4L8s5mQ/honeymoon-resort.jpg",
  },
  {
    title: "Family-Friendly Resorts",
    desc: "Create lasting memories with family-friendly activities, spacious rooms, and fun amenities for kids and adults alike.",
    image: "https://i.ibb.co.com/7t8Jpwg2/family-vacation.jpg",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto slide
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div
      className="relative mt-6 md:mt-14 w-full overflow-hidden h-[200px] md:h-[300px] lg:h-[450px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full flex justify-center items-center"
          style={{
            backgroundImage: `url(${slides[current].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}{" "}
          <div className="absolute w-full h-full bg-black/50"></div>
          {/* Card Content */}
          <div className="relative bg-white/80 md:rounded-lg md:shadow-lg p-2 md:p-10 w-[300px] md:w-2xl text-center flex flex-col items-center gap-2 md:gap-4">
            <h2 className="text-xl md:text-3xl font-bold text-primary">
              {slides[current].title}
            </h2>
            <p className="text-gray-800 text-xs md:text-base">{slides[current].desc}</p>
            <Link href="/hotels" className="btn btn-xs md:btn-sm lg:btn-md btn-primary md:px-6 md:py-2 mt-1 md:mt-2">
              Book A Room
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-2 md:bottom-5 flex gap-2 justify-center w-full">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              current === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
