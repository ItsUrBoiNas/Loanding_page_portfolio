"use client";

import { motion } from "framer-motion";

export default function Founder() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
            Who Builds This
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            The Team Behind the Pages
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur p-8 sm:p-10"
        >
          {/* Avatar placeholder */}
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-black text-white shrink-0 shadow-lg">
              N
            </div>
            <div>
<<<<<<< HEAD
              <p className="text-white font-bold text-lg">Nasir</p>
              <p className="text-slate-400 text-sm">Fort Myers, FL — Self-taught Developer</p>
=======
              <p className="text-white font-bold text-lg">Naslogic</p>
              <p className="text-slate-400 text-sm">Fort Myers, FL — Local Web Design Agency</p>
>>>>>>> 4d3320fa53648fa77910a1298c363034c456194f
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed">
<<<<<<< HEAD
            I&apos;m from Fort Myers, and I taught myself everything I know about web design from scratch. I started Naslogic because I kept seeing the same thing: local businesses with real services, real customers, and genuinely terrible pages that were costing them calls they didn&apos;t even know they were losing. I build custom landing pages — not templates, not drag-and-drop — pages that are built around exactly what your customer needs to see before they trust you. I care more about your conversion rate than a big agency ever would, because this is my one client, not my client&nbsp;#47. Every page I ship is something I&apos;d want someone to judge me by.
=======
            We are based right here in Fort Myers. We started this agency because we kept seeing the exact same problem: local businesses getting overcharged for bulky, 5-page websites that do absolutely nothing to get the phone ringing. We build custom, hand-coded landing pages designed to do one thing—make it incredibly easy for locals to hire you. No confusing menus. No bloated templates. You won&apos;t be passed off to a junior account manager. We handle the code, the design, and the launch ourselves.
>>>>>>> 4d3320fa53648fa77910a1298c363034c456194f
          </p>
        </motion.div>
      </div>
    </section>
  );
}
