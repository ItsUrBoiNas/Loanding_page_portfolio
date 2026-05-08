'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface QuizContactFormProps {
  onSubmit: (data: ContactFormData) => void
  isSubmitting: boolean
}

export function QuizContactForm({ onSubmit, isSubmitting }: QuizContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>()

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 200ms ease-out',
  }

  const errorStyle: React.CSSProperties = {
    color: '#EF4444',
    fontSize: '0.8rem',
    marginTop: '4px',
  }

  return (
    <div style={{ maxWidth: '672px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
      <h2
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
          fontWeight: 600,
          color: '#fff',
          marginBottom: '12px',
          lineHeight: 1.2,
        }}
      >
        Your custom business plan is ready.
      </h2>
      <p
        style={{
          color: '#94A3B8',
          fontSize: '1rem',
          marginBottom: '32px',
          lineHeight: 1.5,
        }}
      >
        Drop your info below and we&apos;ll send it straight to you.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <div>
          <input
            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
            type="text"
            placeholder="First name"
            style={{
              ...inputStyle,
              borderColor: errors.name ? '#EF4444' : 'rgba(255, 255, 255, 0.1)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3B82F6'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errors.name ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'
            }}
          />
          {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' } })}
            type="email"
            placeholder="Email address"
            style={{
              ...inputStyle,
              borderColor: errors.email ? '#EF4444' : 'rgba(255, 255, 255, 0.1)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3B82F6'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errors.email ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'
            }}
          />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register('phone', { required: 'Phone is required', minLength: { value: 10, message: 'Please enter a valid phone number' } })}
            type="tel"
            placeholder="Phone number"
            style={{
              ...inputStyle,
              borderColor: errors.phone ? '#EF4444' : 'rgba(255, 255, 255, 0.1)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3B82F6'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errors.phone ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'
            }}
          />
          {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '18px 32px',
            background: isSubmitting
              ? 'rgba(59, 130, 246, 0.5)'
              : 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 200ms ease-out',
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
          onMouseDown={(e) => {
            if (!isSubmitting) e.currentTarget.style.transform = 'scale(0.98)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          {isSubmitting && (
            <div
              style={{
                width: '20px',
                height: '20px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite',
              }}
            />
          )}
          {isSubmitting ? 'Generating your plan...' : 'Send My Free Plan'}
        </button>

        <p
          style={{
            color: '#64748B',
            fontSize: '0.75rem',
            textAlign: 'center',
            marginTop: '4px',
          }}
        >
          Your info is 100% private. We will never spam you.
        </p>
      </form>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
