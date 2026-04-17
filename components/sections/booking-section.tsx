"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";

import { siteConfig } from "@/config/site";

export default function BookingSection() {
  const { phone, location } = siteConfig.contact;

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-8 lg:gap-12 text-center">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              If your landing page isn&apos;t an asset, it&apos;s a liability.
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Every day a bad page is live is another day a competitor&apos;s phone rings instead of yours.
            </p>

            <div className="space-y-6 max-w-md mx-auto w-full text-left">

              {/* Phone */}
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/40 backdrop-blur-md border border-slate-800/50 hover:border-blue-500/50 transition-all duration-200 hover:scale-105"
              >
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="text-lg font-semibold text-white">{phone}</p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/40 backdrop-blur-md border border-slate-800/50">
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-lg font-semibold text-white">{location}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

