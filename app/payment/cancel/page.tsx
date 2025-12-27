"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-slate-900 rounded-lg border border-slate-800 p-8 text-center"
      >
        <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <X className="w-8 h-8 text-yellow-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Cancelled</h1>
        <p className="text-slate-400 mb-6">
          Your payment was cancelled. No charges have been made.
        </p>
        <p className="text-slate-300 mb-6">
          If you&apos;d like to complete your purchase, you can try again or contact us for assistance.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button variant="primary">Return to Home</Button>
          </Link>
          <Link href="/#pricing">
            <Button variant="secondary">View Pricing</Button>
          </Link>
        </div>
      </motion.div>
    </main>
  )
}









