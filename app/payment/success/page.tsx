"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  useEffect(() => {
    if (orderId) {
      captureOrder(orderId)
    } else {
      setStatus("error")
    }
  }, [orderId])

  const captureOrder = async (paypalOrderId: string) => {
    try {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: paypalOrderId }),
      })

      if (!response.ok) {
        throw new Error("Failed to capture order")
      }

      const data = await response.json()
      setOrderNumber(data.orderNumber)
      setStatus("success")
    } catch (error) {
      console.error("Capture error:", error)
      setStatus("error")
    }
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-slate-900 rounded-lg border border-slate-800 p-8 text-center"
      >
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Processing Payment...</h1>
            <p className="text-slate-400">Please wait while we confirm your payment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-slate-400 mb-4">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            {orderNumber && (
              <p className="text-lg text-white mb-6">
                Order Number: <span className="font-semibold">{orderNumber}</span>
              </p>
            )}
            <p className="text-slate-300 mb-6">
              Your single-page landing page will be delivered within 2 business days.
              We&apos;ll send you an email confirmation shortly.
            </p>
            <Link href="/">
              <Button variant="primary">Return to Home</Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Error</h1>
            <p className="text-slate-400 mb-6">
              There was an issue processing your payment. Please contact support if the problem persists.
            </p>
            <Link href="/">
              <Button variant="primary">Return to Home</Button>
            </Link>
          </>
        )}
      </motion.div>
    </main>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-white">Loading...</div>
      </main>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}

