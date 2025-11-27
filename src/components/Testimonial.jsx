"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react"; // icon library (npm install lucide-react)

const testimonials = [
  {
    name: "Sadia Rahman",
    location: "Dhaka, Bangladesh",
    rating: 5,
    comment:
      "Found an amazing resort in Cox’s Bazar within minutes! Booking was smooth and the room view was exactly as shown.",
    img: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Mahmud Hasan",
    location: "Sylhet, Bangladesh",
    rating: 4,
    comment:
      "Booked a room in Srimangal for a weekend trip. Great deals and the process was super easy to follow.",
    img: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Farhana Akter",
    location: "Chattogram, Bangladesh",
    rating: 5,
    comment:
      "Very reliable service. I found a budget hotel instantly while traveling. Customer support was great!",
    img: "https://i.pravatar.cc/150?img=32",
  },
];

export default function Testimonial() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-primary"
        >
          What Our Travelers Say
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-accent max-w-xl mx-auto"
        >
          Real stories from our users who booked hotels & resorts across Bangladesh.
        </motion.p>

        {/* Testimonials */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition"
            >
              
              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />

                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mt-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < t.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="mt-4 text-gray-600 text-left italic leading-relaxed">
                “{t.comment}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
