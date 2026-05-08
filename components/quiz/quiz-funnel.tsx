'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, X } from 'lucide-react'
import { QuizProgress } from './quiz-progress'
import { QuizStep } from './quiz-step'
import { QuizOptionCard } from './quiz-option-card'
import { QuizContactForm } from './quiz-contact-form'
import { QuizSuccess } from './quiz-success'
import type { QuizLeadData } from '@/lib/quiz-validations'

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  'local-service': 'I run a local service business',
  'ecommerce': 'I sell products online',
  'coaching-consulting': 'I do coaching or consulting',
  'restaurant-food': 'I run a restaurant or food business',
  'real-estate': "I'm in real estate",
  'other': 'Something else',
}

const WEBSITE_STATUS_LABELS: Record<string, string> = {
  'has-website-not-working': "Yeah, but it's not getting me customers",
  'no-website': 'No, I need one',
}

const REVENUE_LABELS: Record<string, string> = {
  'starter': 'Just getting started (under $5k/mo)',
  'growing': 'Growing ($5k - $20k/mo)',
  'established': 'Established ($20k - $50k/mo)',
  'doing-well': 'Doing well ($50k+/mo)',
}

interface StepConfig {
  question: string
  type: 'single' | 'multi'
  key: keyof QuizLeadData
  options: { label: string; value: string }[]
  helperText?: string
}

const steps: StepConfig[] = [
  {
    question: "First things first -- what do you do?",
    type: 'single',
    key: 'businessType',
    options: Object.entries(BUSINESS_TYPE_LABELS).map(([value, label]) => ({ label, value })),
  },
  {
    question: 'Do you have a website right now?',
    type: 'single',
    key: 'hasWebsite',
    options: Object.entries(WEBSITE_STATUS_LABELS).map(([value, label]) => ({ label, value })),
  },
  {
    question: "What's driving you crazy about your business right now?",
    type: 'multi',
    key: 'problems',
    helperText: 'Pick up to 3',
    options: [
      { label: "My phone isn't ringing enough", value: "My phone isn't ringing enough" },
      { label: 'My website is embarrassing', value: 'My website is embarrassing' },
      { label: 'Nobody can find me on Google', value: 'Nobody can find me on Google' },
      { label: "I have no idea what's actually working", value: "I have no idea what's actually working" },
      { label: "I'm wearing every hat and it's exhausting", value: "I'm wearing every hat and it's exhausting" },
      { label: 'My competitors look way better than me online', value: 'My competitors look way better than me online' },
    ],
  },
  {
    question: 'What would it look like if you figured this out?',
    type: 'multi',
    key: 'goals',
    helperText: 'Pick up to 3',
    options: [
      { label: 'I finally feel like I figured it out', value: 'I finally feel like I figured it out' },
      { label: 'My phone rings every day with new customers', value: 'My phone rings every day with new customers' },
      { label: 'More money in my pocket', value: 'More money in my pocket' },
      { label: 'When people Google me, I actually look legit', value: 'When people Google me, I actually look legit' },
      { label: "I stop wasting time on stuff that doesn't work", value: "I stop wasting time on stuff that doesn't work" },
    ],
  },
  {
    question: "Where's your business at right now?",
    type: 'single',
    key: 'revenueRange',
    options: Object.entries(REVENUE_LABELS).map(([value, label]) => ({ label, value })),
  },
]

function getSubtitle(answers: Partial<QuizLeadData>, stepIndex: number): string | undefined {
  if (stepIndex === 0) return undefined

  if (stepIndex === 1) {
    switch (answers.businessType) {
      case 'local-service': return "Got it -- let's figure out where you're at."
      case 'ecommerce': return "Nice. Online businesses have huge upside -- let's dig in."
      case 'coaching-consulting': return "Smart. Let's see what's going on."
      case 'restaurant-food': return "Love it. Let's figure out what's holding you back."
      case 'real-estate': return "Got it -- real estate is all about trust online."
      case 'other': return "No problem -- let's dig in."
      default: return undefined
    }
  }

  if (stepIndex === 2) {
    switch (answers.hasWebsite) {
      case 'has-website-not-working': return "That's more common than you think. Quick question --"
      case 'no-website': return "No worries -- that's actually the easiest thing to fix. But first --"
      default: return undefined
    }
  }

  if (stepIndex === 3) return 'Almost done.'
  if (stepIndex === 4) return 'Last one.'

  return undefined
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
}

export function QuizFunnel() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<Partial<QuizLeadData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 0-4 = quiz steps, 5 = contact form, 6 = success
  const totalQuizSteps = 5
  const isQuizStep = currentStep < totalQuizSteps
  const isContactStep = currentStep === totalQuizSteps
  const isSuccessStep = currentStep === totalQuizSteps + 1

  const goForward = useCallback(() => {
    setDirection(1)
    setCurrentStep((s) => s + 1)
  }, [])

  const goBack = useCallback(() => {
    setDirection(-1)
    setCurrentStep((s) => Math.max(0, s - 1))
  }, [])

  const handleSingleSelect = useCallback(
    (key: keyof QuizLeadData, value: string) => {
      setAnswers((prev) => ({ ...prev, [key]: value }))
      // Auto-advance after brief highlight
      setTimeout(() => {
        goForward()
      }, 400)
    },
    [goForward],
  )

  const handleMultiToggle = useCallback(
    (key: 'problems' | 'goals', value: string) => {
      setAnswers((prev) => {
        const current = (prev[key] as string[] | undefined) || []
        if (current.includes(value)) {
          return { ...prev, [key]: current.filter((v) => v !== value) }
        }
        if (current.length >= 3) return prev
        return { ...prev, [key]: [...current, value] }
      })
    },
    [],
  )

  const handleContactSubmit = useCallback(
    async (data: { name: string; email: string; phone: string }) => {
      setIsSubmitting(true)
      setError(null)

      const payload: QuizLeadData = {
        ...data,
        businessType: answers.businessType || 'other',
        hasWebsite: answers.hasWebsite || 'no-website',
        problems: (answers.problems as string[]) || [],
        goals: (answers.goals as string[]) || [],
        revenueRange: answers.revenueRange || 'starter',
      } as QuizLeadData

      try {
        const res = await fetch('/api/quiz-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || 'Something went wrong. Please try again.')
        }

        goForward()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [answers, goForward],
  )

  const handleClose = useCallback(() => {
    window.location.href = '/'
  }, [])

  const progressStep = isQuizStep ? currentStep + 1 : totalQuizSteps

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0f',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Background radial gradient */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '20px 20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {currentStep > 0 && !isSuccessStep ? (
            <button
              type="button"
              onClick={goBack}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.875rem',
              }}
            >
              <ArrowLeft size={18} />
              Back
            </button>
          ) : (
            <div />
          )}

          {!isSuccessStep && (
            <button
              type="button"
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                padding: '8px',
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Progress bar */}
        {!isSuccessStep && (
          <QuizProgress currentStep={progressStep} totalSteps={totalQuizSteps} />
        )}
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 5,
          padding: '20px 0 60px',
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ width: '100%' }}
          >
            {isQuizStep && (() => {
              const step = steps[currentStep]
              const subtitle = getSubtitle(answers, currentStep)
              const isMulti = step.type === 'multi'
              const selectedValues = isMulti
                ? ((answers[step.key] as string[] | undefined) || [])
                : []
              const singleValue = !isMulti ? (answers[step.key] as string | undefined) : undefined

              return (
                <QuizStep
                  question={step.question}
                  subtitle={subtitle}
                  helperText={step.helperText}
                  showContinue={isMulti && selectedValues.length > 0}
                  onContinue={isMulti ? goForward : undefined}
                >
                  {step.options.map((opt) => (
                    <QuizOptionCard
                      key={opt.value}
                      label={opt.label}
                      mode={step.type}
                      selected={
                        isMulti
                          ? selectedValues.includes(opt.value)
                          : singleValue === opt.value
                      }
                      onClick={() => {
                        if (isMulti) {
                          handleMultiToggle(step.key as 'problems' | 'goals', opt.value)
                        } else {
                          handleSingleSelect(step.key, opt.value)
                        }
                      }}
                    />
                  ))}
                </QuizStep>
              )
            })()}

            {isContactStep && (
              <>
                <QuizContactForm
                  onSubmit={handleContactSubmit}
                  isSubmitting={isSubmitting}
                />
                {error && (
                  <p
                    style={{
                      color: '#EF4444',
                      fontSize: '0.875rem',
                      textAlign: 'center',
                      marginTop: '16px',
                      padding: '0 20px',
                    }}
                  >
                    {error}
                  </p>
                )}
              </>
            )}

            {isSuccessStep && <QuizSuccess onClose={handleClose} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
