"use client";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPreview = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/hotels");
      console.log(res.data);
      setHotels(res.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch preview data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreview();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <div className="loading loading-xl loading-dots"></div>;
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="md:my-16 bg-green-100 p-5 md:p-10">
      <div className="text-center space-y-3 md:space-y-5 mb-6 md:mb-10">
        <h1 className="text-2xl md:text-5xl font-bold text-primary">
          Unlock Every Destination
        </h1>
        <p className="md:w-3/4 mx-auto text-xs md:text-sm text-accent">
          TravelNest brings every hotel to your fingertips. Discover hidden
          gems, renowned resorts, and cozy retreats in one place. With options
          for every traveler, every trip becomes easier to plan and more
          exciting. Find the hotel that turns your journey into an adventure.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {hotels.map((hotel) => (
          <div key={hotel._id}>
            <motion.div
              className="bg-white rounded-t-2xl shadow-lg overflow-hidden flex flex-col"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-40 md:h-56 relative">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>

              <div className="p-2 md:p-4 flex flex-col justify-between flex-1 md:space-y-3">
                <div>
                  <h3 className="md:text-2xl font-semibold text-neutral">
                    {hotel.hotel}
                  </h3>
                  <p className="text-xs md:text-sm text-accent mt-1">
                    {hotel.location}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm md:text-base font-medium text-accent">
                    {hotel.dateFrom} - {hotel.dateTo}
                  </span>
                  <h3 className="md:text-xl font-bold text-secondary">
                    ${hotel.pricePerDay}
                    <span className="text-sm md:text-base font-medium">
                      /night
                    </span>
                  </h3>
                </div>

                <Link href="/rooms" className="btn btn-sm md:btn-md btn-primary hover:btn-secondary text-white transition">
                  See Room
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
