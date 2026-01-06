import * as z from "zod"

export const purchaseSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    company: z.string().optional(),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    location: z.string().optional(),
    needs: z.string().min(10, "Please provide more detail about your needs"),
    references: z.any().optional(), // File validation is handled separately or can be refined
})

export type PurchaseFormValues = z.infer<typeof purchaseSchema>

export const quoteSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    budget: z.string().min(1, "Please select a budget range"),
    timeline: z.string().min(1, "Please select a timeline"),
    details: z.string().min(10, "Please provide more detail about your project"),
})

export type QuoteFormValues = z.infer<typeof quoteSchema>
