"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/modals/form-modal";
import PurchaseForm from "@/components/forms/purchase-form";

export default function Pricing() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-4"
        >
          Simple Investment. Big Returns.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-400 text-center mb-16"
        >
          No tier lists. No recurring subscriptions. Just one price for a page that works.
        </motion.p>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card variant="glass" className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-3xl mb-2">The $199 Page</CardTitle>
                <CardDescription className="text-slate-300 text-base mb-4">
                  A custom HTML/CSS landing page built directly in Fort Myers. Perfect for first-time buyers.
                </CardDescription>
                <div className="text-5xl font-bold text-white mb-2">$199</div>
                <p className="text-sm text-slate-400 font-semibold mb-2">Flat Rate. 48-Hour Turnaround.</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">✓</span>
                    <span className="text-slate-300">1 Custom Designed Page</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">✓</span>
                    <span className="text-slate-300">Mobile Responsive Layout</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">✓</span>
                    <span className="text-slate-300">One-click &quot;Call Now&quot; buttons</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">✓</span>
                    <span className="text-slate-300">Zero recurring software fees</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => setIsPurchaseModalOpen(true)}
                  >
                    Get Your Page Built
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>

      <FormModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        title="Get My Page — $199"
      >
        <PurchaseForm
          onSuccess={() => setIsPurchaseModalOpen(false)}
          onClose={() => setIsPurchaseModalOpen(false)}
        />
      </FormModal>
    </section>
  );
}

