"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/modals/form-modal";
import PurchaseForm from "@/components/forms/purchase-form";
import QuoteForm from "@/components/forms/quote-form";
import { siteConfig } from "@/config/site";

export default function Pricing() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

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
          Get it done right.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-400 text-center mb-16"
        >
          Every day you wait is another lead handed to your competitors.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {siteConfig.pricing.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="glass" className={`flex flex-col h-full ${tier.popular ? 'border-blue-500 relative' : ''}`}>
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-3xl mb-2">{tier.name}</CardTitle>
                  <CardDescription className="text-slate-300 text-base mb-4 min-h-[48px]">
                    {tier.description}
                  </CardDescription>
                  <div className="text-5xl font-bold text-white mb-2">{tier.price}</div>
                  <p className="text-sm text-slate-400 font-semibold mb-2">{tier.hostingFee}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2 font-bold">✓</span>
                        <span className={feature.includes("Includes Everything") ? "text-white font-semibold" : "text-slate-300"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <div className="w-full mt-4">
                    <Button
                      variant={tier.popular ? "primary" : "outline"}
                      className="w-full"
                      onClick={() => index === 0 ? setIsPurchaseModalOpen(true) : setIsQuoteModalOpen(true)}
                    >
                      {tier.cta}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <FormModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        title="Get My Page — $399"
      >
        <PurchaseForm
          onSuccess={() => setIsPurchaseModalOpen(false)}
          onClose={() => setIsPurchaseModalOpen(false)}
        />
      </FormModal>

      <FormModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        title="Get Free Quote"
      >
        <QuoteForm
          onSuccess={() => setIsQuoteModalOpen(false)}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      </FormModal>
    </section>
  );
}

