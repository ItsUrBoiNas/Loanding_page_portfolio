"use client";

import { motion } from "framer-motion";
import { 
  ShoppingBag,
  Truck,
  Shield,
  ArrowRight,
  Check,
  Timer,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";

export default function EcomPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Full Screen Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/50 via-black to-black">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block px-6 py-2 bg-orange-500 text-black font-bold text-sm uppercase tracking-wider mb-6"
            >
              Limited Edition Drop
            </motion.div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-6 leading-tight">
              THE LAST{" "}
              <span className="block text-orange-500">HOODIE</span>
              <span className="block">YOU WILL</span>
              <span className="block text-orange-500">EVER BUY</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-bold mb-8 text-gray-300 max-w-3xl mx-auto">
              Premium quality. Lifetime guarantee. Streetwear that lasts.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-orange-500 text-black font-black text-xl uppercase tracking-wider hover:bg-orange-400 transition-colors"
            >
              Shop Now
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-orange-500 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Scarcity Timer */}
      <section className="py-16 bg-gradient-to-r from-orange-900/30 via-black to-orange-900/30 border-y border-orange-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-black border-2 border-orange-500 p-8 rounded-lg"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Timer className="w-6 h-6 text-orange-500" />
              <h2 className="text-3xl font-black uppercase">Drop Ends In</h2>
            </div>
            <div className="flex justify-center gap-4 md:gap-8">
              {[
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds }
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="bg-orange-500 text-black text-4xl md:text-6xl font-black px-4 py-2 md:px-6 md:py-4 mb-2">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-orange-500 font-bold text-lg">
              Only 47 left in stock!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase">
              Built to <span className="text-orange-500">Last</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Premium materials. Uncompromising quality. Streetwear that defines you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: "Classic Black",
                price: "$149",
                image: "bg-gradient-to-br from-gray-900 to-black",
                badge: "Best Seller"
              },
              {
                title: "Orange Accent",
                price: "$149",
                image: "bg-gradient-to-br from-orange-900 to-black",
                badge: "New"
              }
            ].map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10 px-4 py-2 bg-orange-500 text-black font-bold text-sm uppercase">
                    {product.badge}
                  </div>
                )}
                <div className={`${product.image} aspect-square rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ff6b35' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
                  }} />
                  <ShoppingBag className="w-32 h-32 text-orange-500/20" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{product.title}</h3>
                    <p className="text-3xl font-black text-orange-500">{product.price}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-6 py-3 bg-orange-500 text-black font-bold uppercase hover:bg-orange-400 transition-colors"
                  >
                    Buy
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Lifetime Guarantee",
                description: "If it breaks, we replace it. No questions asked."
              },
              {
                icon: Truck,
                title: "Free Shipping",
                description: "Worldwide shipping on all orders. Fast & secure."
              },
              {
                icon: Star,
                title: "Premium Quality",
                description: "Only the finest materials. Built to last forever."
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-2 border-orange-500/30 p-6"
              >
                <feature.icon className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-900/20 to-black border-y border-orange-500/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase">
              What People <span className="text-orange-500">Say</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                name: "Alex M.",
                rating: 5,
                text: "This is literally the best hoodie I've ever owned. Quality is insane and it's been through everything."
              },
              {
                name: "Jordan K.",
                rating: 5,
                text: "Worth every penny. The lifetime guarantee sold me, but the quality is what keeps me coming back."
              },
              {
                name: "Sam T.",
                rating: 5,
                text: "Streetwear that actually lasts. This is what I've been looking for my whole life."
              }
            ].map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black border-2 border-orange-500/30 p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-lg mb-3 text-gray-300">&quot;{review.text}&quot;</p>
                <p className="font-bold text-orange-500">— {review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Buy Button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t-2 border-orange-500 p-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-sm text-gray-400 mb-1">Limited Edition Hoodie</div>
            <div className="text-2xl font-black text-orange-500">$149</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 bg-orange-500 text-black font-black text-lg uppercase tracking-wider hover:bg-orange-400 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Buy Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Spacer for sticky button */}
      <div className="h-24" />
    </div>
  );
}

