"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function FloatingActionButton() {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById("contact");
    bookingSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToBooking}
      className="fixed bottom-6 right-6 md:hidden z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-200 flex items-center gap-2 font-semibold"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Book a call"
    >
      <Calendar className="w-5 h-5" />
      <span>Book Call</span>
    </motion.button>
  );
}
