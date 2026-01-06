"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Upload, Loader2, AlertCircle } from "lucide-react"
import { purchaseSchema, type PurchaseFormValues } from "@/lib/validations"

export default function PurchaseForm({ onSuccess, onClose }: { onSuccess?: () => void; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileList, setFileList] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileList(Array.from(e.target.files))
    }
  }

  const onSubmit = async (data: PurchaseFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // First, upload files if any
      const uploadedFiles: string[] = []
      if (fileList.length > 0) {
        const formDataToSend = new FormData()
        fileList.forEach((file) => {
          formDataToSend.append("files", file)
        })

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formDataToSend,
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload files")
        }

        const uploadData = await uploadResponse.json()
        uploadedFiles.push(...uploadData.ids)
      }

      // Create PayPal order
      const orderResponse = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 199,
          formData: {
            ...data,
            references: uploadedFiles,
          },
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create PayPal order")
      }

      const { orderId, approvalUrl } = await orderResponse.json()

      // Redirect to PayPal
      window.location.href = approvalUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            {...register("name")}
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="text-sm text-red-400">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Company</label>
          <input
            {...register("company")}
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            placeholder="Company Name"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Website</label>
          <input
            {...register("website")}
            type="url"
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            placeholder="https://example.com"
          />
          {errors.website && <p className="text-sm text-red-400">{errors.website.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Location</label>
          <input
            {...register("location")}
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            placeholder="City, State"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Describe Your Needs <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register("needs")}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all placeholder:text-slate-500"
          placeholder="Tell us about your landing page requirements..."
        />
        {errors.needs && <p className="text-sm text-red-400">{errors.needs.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Upload References/Designs</label>
        <div className="relative group">
          <input
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-white cursor-pointer hover:bg-slate-700 hover:border-blue-500/50 transition-all duration-200"
          >
            <Upload className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-slate-300 group-hover:text-white transition-colors">
              {fileList.length > 0 ? `${fileList.length} file(s) selected` : "Choose files to upload"}
            </span>
          </label>
        </div>
        {fileList.length > 0 && (
          <ul className="mt-2 space-y-1">
            {fileList.map((file, index) => (
              <li key={index} className="text-sm text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">Single Page Landing Page</p>
            <p className="text-slate-400 text-sm">No payment processing • 2 day turn-around</p>
          </div>
          <p className="text-2xl font-bold text-white tracking-tight">$199</p>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Purchase Now - $199"
          )}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}












