"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Doubled my leads in the first month. Best $199 I ever spent.",
    name: "Marcus T.",
    business: "Roofing Company",
  },
  {
    quote: "I had no website at all. Now I have one that actually gets me calls.",
    name: "Sarah L.",
    business: "Cleaning Service",
  },
  {
    quote: "The design is incredible. Way better than what I was quoted $3k for.",
    name: "David R.",
    business: "HVAC Contractor",
  },
  {
    quote: "Delivered in 2 days like he said. Page looks like it cost 10x more.",
    name: "Jessica M.",
    business: "Med Spa",
  },
  {
    quote: "Professional, fast, and actually cares about results. Not just looks.",
    name: "Anthony K.",
    business: "Landscaping",
  },
  {
    quote: "I was paying $150/mo for a garbage Wix site. This is night and day.",
    name: "Rachel W.",
    business: "Dog Groomer",
  },
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
          What Clients Say
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
                <p className="text-lg sm:text-xl text-white font-medium mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-blue-400">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.business}</p>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
