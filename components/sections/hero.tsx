"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/modals/form-modal";
import PurchaseForm from "@/components/forms/purchase-form";
import QuoteForm from "@/components/forms/quote-form";

export default function Hero() {
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-black to-slate-950">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight"
        >
          Your business deserves a website
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            that actually gets you customers.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl text-slate-400 mb-10 max-w-3xl mx-auto"
        >
          Custom landing page. $199 flat. Delivered in 48 hours. Built to convert from day one.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => setIsPurchaseOpen(true)}
            size="lg"
            pulse
            className="text-lg"
          >
            Get My Page — $199
          </Button>
          <Button
            onClick={() => setIsQuoteOpen(true)}
            size="lg"
            variant="secondary"
            className="text-lg"
          >
            Get a Free Quote
          </Button>
        </motion.div>
      </div>

      {/* Modals */}
      <FormModal
        isOpen={isPurchaseOpen}
        onClose={() => setIsPurchaseOpen(false)}
        title="Get My Page — $199"
      >
        <PurchaseForm
          onSuccess={() => setIsPurchaseOpen(false)}
          onClose={() => setIsPurchaseOpen(false)}
        />
      </FormModal>

      <FormModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        title="Get a Free Quote"
      >
        <QuoteForm
          onSuccess={() => setIsQuoteOpen(false)}
          onClose={() => setIsQuoteOpen(false)}
        />
      </FormModal>
    </section>
  );
}

