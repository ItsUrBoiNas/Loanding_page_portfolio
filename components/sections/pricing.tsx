"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/modals/form-modal";
import PurchaseForm from "@/components/forms/purchase-form";
import QuoteForm from "@/components/forms/quote-form";
import { siteConfig } from "@/config/site";

const pricingTiers = siteConfig.pricing;

export default function Pricing() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

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
          Choose the plan that fits your needs
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="glass" className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-3xl mb-2">{tier.name}</CardTitle>
                  <CardDescription className="text-slate-300 text-base mb-4">
                    {tier.description}
                  </CardDescription>
                  <div className="text-4xl font-bold text-white mb-2">{tier.price}</div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <div className="w-full space-y-2">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => {
                        if (tier.name === "Starter") {
                          setIsPurchaseModalOpen(true)
                        } else {
                          setIsQuoteModalOpen(true)
                        }
                      }}
                    >
                      {tier.name === "Starter" ? "Purchase Now - $199" : tier.cta}
                    </Button>
                    {tier.name === "Starter" && (
                      <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() => setIsQuoteModalOpen(true)}
                      >
                        Get A Quote
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <FormModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        title="Purchase Now - Single Page Landing Page"
      >
        <PurchaseForm
          onSuccess={() => setIsPurchaseModalOpen(false)}
          onClose={() => setIsPurchaseModalOpen(false)}
        />
      </FormModal>

      <FormModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        title="Get A Quote - Multi-Page Site"
      >
        <QuoteForm
          onSuccess={() => setIsQuoteModalOpen(false)}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      </FormModal>
    </section>
  );
}

