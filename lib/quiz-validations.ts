import { z } from 'zod'

export const businessTypes = [
  'local-service',
  'ecommerce',
  'coaching-consulting',
  'restaurant-food',
  'real-estate',
  'other',
] as const

export const websiteStatuses = [
  'has-website-not-working',
  'no-website',
] as const

export const problemOptions = [
  "My phone isn't ringing enough",
  'My website is embarrassing',
  'Nobody can find me on Google',
  "I have no idea what's actually working",
  "I'm wearing every hat and it's exhausting",
  'My competitors look way better than me online',
] as const

export const goalOptions = [
  'I finally feel like I figured it out',
  'My phone rings every day with new customers',
  'More money in my pocket',
  'When people Google me, I actually look legit',
  "I stop wasting time on stuff that doesn't work",
] as const

export const revenueRanges = [
  'starter',
  'growing',
  'established',
  'doing-well',
] as const

export const quizLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  businessType: z.enum(businessTypes),
  hasWebsite: z.enum(websiteStatuses),
  problems: z.array(z.string()).min(1).max(3),
  goals: z.array(z.string()).min(1).max(3),
  revenueRange: z.enum(revenueRanges),
})

export type QuizLeadData = z.infer<typeof quizLeadSchema>
