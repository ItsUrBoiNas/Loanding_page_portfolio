"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const caseFiles = [
  {
    id: "glow",
    client: "Glow MedSpa",
    location: "Fort Myers, FL",
    tag: "Case File #001",
    before: {
      label: "The Problem",
      text: "Homepage copy talked about \"luxury treatments\" with no prices, no before/after, and a contact form that looked like a tax document. Every click to 'Book Now' went to a dead Booking link.",
      metric: "Avg. 3 new bookings / mo.",
    },
    after: {
      label: "What Changed",
      text: "Single-page overhaul: lead with the specific treatment, show a real result statement, one-click booking above the fold. Copy rewired around the reader's fear ('am I a candidate?') instead of the business's menu.",
      metric: "Avg. 19 new bookings / mo.",
    },
  },
  {
    id: "whitfield",
    client: "Whitfield Law",
    location: "Fort Myers, FL",
    tag: "Case File #002",
    before: {
      label: "The Problem",
      text: "Four-page website with a stock photo of scales, a paragraph bio, and a phone number buried in the footer. The headline said 'Dedicated Legal Representation' — which is what every law site says.",
      metric: "Bounce rate: 78%",
    },
    after: {
      label: "What Changed",
      text: "One focused landing page targeting the exact case type (slip & fall). Headline rewritten around the visitor's situation. Trust signals: case outcome, bar associations, direct call button at the top. No fluff.",
      metric: "Bounce rate: 31%",
    },
  },
];

export default function CaseFiles() {
  const [activeCases, setActiveCases] = useState<Record<string, "before" | "after">>({
    glow: "before",
    whitfield: "before",
  });

  const toggle = (id: string) => {
    setActiveCases((prev) => ({
      ...prev,
      [id]: prev[id] === "before" ? "after" : "before",
    }));
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
            Real Work. Real Results.
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            The Case Files
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Toggle to see what was wrong — and what we did about it.
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseFiles.map((c, index) => {
            const side = activeCases[c.id];
            const isBefore = side === "before";
            const data = isBefore ? c.before : c.after;

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/50 backdrop-blur"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                      {c.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{c.client}</h3>
                    <p className="text-sm text-slate-500">{c.location}</p>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => toggle(c.id)}
                    className="flex items-center gap-1 rounded-full p-1 bg-slate-800 border border-slate-700 hover:border-blue-500/50 transition-colors duration-200 cursor-pointer"
                    aria-label={`Toggle ${c.client} case view`}
                  >
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                        isBefore
                          ? "bg-red-500/20 text-red-400 border border-red-500/40"
                          : "text-slate-500"
                      }`}
                    >
                      Before
                    </span>
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                        !isBefore
                          ? "bg-green-500/20 text-green-400 border border-green-500/40"
                          : "text-slate-500"
                      }`}
                    >
                      After
                    </span>
                  </button>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={side}
                    initial={{ opacity: 0, x: isBefore ? -12 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isBefore ? 12 : -12 }}
                    transition={{ duration: 0.22 }}
                    className="p-6 sm:p-8"
                  >
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
                      {/* Text */}
                      <div className="flex-1">
                        <p
                          className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                            isBefore ? "text-red-400" : "text-green-400"
                          }`}
                        >
                          {data.label}
                        </p>
                        <p className="text-slate-300 text-base leading-relaxed">{data.text}</p>
                      </div>

                      {/* Metric */}
                      <div
                        className={`shrink-0 rounded-xl border px-6 py-5 text-center w-full sm:w-auto sm:min-w-[160px] ${
                          isBefore
                            ? "border-red-500/30 bg-red-500/10"
                            : "border-green-500/30 bg-green-500/10"
                        }`}
                      >
                        <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">
                          Result
                        </p>
                        <p
                          className={`text-lg font-bold leading-tight ${
                            isBefore ? "text-red-300" : "text-green-300"
                          }`}
                        >
                          {data.metric}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
