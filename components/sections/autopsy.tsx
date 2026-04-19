"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const problems = [
  {
    id: "headline",
    label: "Vague Headline",
    position: { top: "12%", left: "50%" },
    color: "from-red-500/20 to-red-600/20",
    borderColor: "border-red-500/50",
    dotColor: "bg-red-500",
    indictment: "This headline is about you, not them. Nobody cares.",
    icon: "⚡",
  },
  {
    id: "proof",
    label: "No Social Proof",
    position: { top: "38%", left: "15%" },
    color: "from-orange-500/20 to-orange-600/20",
    borderColor: "border-orange-500/50",
    dotColor: "bg-orange-400",
    indictment: "Would you hand a stranger $500 with zero receipts? Neither will they.",
    icon: "🔍",
  },
  {
    id: "button",
    label: "Generic Button",
    position: { top: "62%", left: "50%" },
    color: "from-yellow-500/20 to-yellow-600/20",
    borderColor: "border-yellow-500/50",
    dotColor: "bg-yellow-400",
    indictment: "'Submit' is a form. Not a feeling. Not a reason to click.",
    icon: "🎯",
  },
  {
    id: "text",
    label: "Wall of Text",
    position: { top: "38%", left: "85%" },
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/50",
    dotColor: "bg-purple-400",
    indictment: "They came to decide, not to read your About page.",
    icon: "📄",
  },
];

export default function Autopsy() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase text-red-400 bg-red-500/10 border border-red-500/20 rounded-full">
            Why Most Pages Fail
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            The Page Autopsy
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Hover each marker. These are the mistakes that cost businesses customers every single day.
          </p>
        </motion.div>

        {/* Autopsy Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto mt-12"
          style={{ maxWidth: 680 }}
        >
          {/* The "patient" — a generic landing page mockup */}
          <div className="relative rounded-xl border border-slate-700/60 bg-slate-900/80 backdrop-blur overflow-hidden shadow-2xl shadow-black/50">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/60">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="ml-3 flex-1 h-5 rounded bg-slate-700/50 max-w-xs" />
            </div>

            {/* Fake page content */}
            <div className="relative p-8 sm:p-12 select-none" style={{ minHeight: 380 }}>
              {/* Fake headline */}
              <div className="mb-5">
                <div className="h-8 bg-slate-700/60 rounded w-4/5 mb-2" />
                <div className="h-8 bg-slate-700/40 rounded w-3/5" />
              </div>
              {/* Fake subtext */}
              <div className="mb-7 space-y-2">
                <div className="h-4 bg-slate-700/30 rounded w-full" />
                <div className="h-4 bg-slate-700/30 rounded w-full" />
                <div className="h-4 bg-slate-700/30 rounded w-5/6" />
                <div className="h-4 bg-slate-700/30 rounded w-full" />
                <div className="h-4 bg-slate-700/30 rounded w-4/6" />
                <div className="h-4 bg-slate-700/30 rounded w-full" />
                <div className="h-4 bg-slate-700/30 rounded w-3/6" />
              </div>
              {/* Fake button */}
              <div className="mb-8">
                <div className="h-11 bg-slate-600/40 rounded-lg w-40" />
              </div>
              {/* Fake "no social proof" area */}
              <div className="flex gap-4">
                <div className="h-12 bg-slate-700/20 rounded-lg flex-1" />
                <div className="h-12 bg-slate-700/20 rounded-lg flex-1" />
              </div>
            </div>

            {/* Problem markers — overlaid absolutely */}
            <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
              {problems.map((p) => (
                <div
                  key={p.id}
                  className="absolute"
                  style={{
                    top: p.position.top,
                    left: p.position.left,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "auto",
                    zIndex: 10,
                  }}
                >
                  {/* Pulsing dot */}
                  <div
                    className="relative cursor-pointer group"
                    onMouseEnter={() => setActiveId(p.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onTouchStart={() => setActiveId(activeId === p.id ? null : p.id)}
                    aria-label={p.label}
                  >
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${p.dotColor}`}
                    />
                    <span
                      className={`relative inline-flex rounded-full w-5 h-5 ${p.dotColor} shadow-lg`}
                    />

                    {/* Tooltip */}
                    <AnimatePresence>
                      {activeId === p.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.18 }}
                          className={`absolute z-50 w-64 sm:w-72 rounded-xl border ${p.borderColor} bg-gradient-to-br ${p.color} backdrop-blur-md shadow-2xl p-4`}
                          style={{
                            bottom: "calc(100% + 12px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        >
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                            {p.icon} {p.label}
                          </p>
                          <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                            {p.indictment}
                          </p>
                          {/* Arrow */}
                          <div
                            className={`absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rotate-45 bg-slate-900 border-r border-b ${p.borderColor}`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            {/* Red X overlay — "dead" page */}
            <div className="absolute top-3 right-4 text-red-500/40 font-black text-3xl select-none pointer-events-none">
              ✕
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-xs text-slate-500 mt-4 tracking-wide">
            This is what most businesses settle for. Yours doesn&apos;t have to look like this.
          </p>
        </motion.div>

        {/* Four problem pill summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
          {problems.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-xl border ${p.borderColor} bg-gradient-to-br ${p.color} p-4 text-center cursor-default`}
              onMouseEnter={() => setActiveId(p.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <div className="text-2xl mb-1">{p.icon}</div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-300">{p.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
