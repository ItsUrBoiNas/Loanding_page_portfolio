"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const testimonials = [
  "Nasir doubled my leads!",
  "Best investment we made.",
  "The design is incredible.",
  "ROI in the first month.",
  "Professional and fast.",
  "Exceeded expectations.",
];

// Duplicate for seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-16"
        >
          Testimonials
        </motion.h2>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -50 * 100],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <Card
                key={index}
                variant="glass"
                hover={false}
                className="flex-shrink-0 w-[300px] sm:w-[400px] px-6 sm:px-8 py-6"
              >
                <p className="text-lg sm:text-xl text-white font-medium">{testimonial}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

