'use client'

import { Confetti } from './confetti'

interface QuizSuccessProps {
  onClose: () => void
}

export function QuizSuccess({ onClose }: QuizSuccessProps) {
  return (
    <div
      style={{
        maxWidth: '672px',
        margin: '0 auto',
        width: '100%',
        padding: '0 20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <Confetti />

      <h2
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2rem)',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.2,
          marginBottom: '4px',
        }}
      >
        You&apos;re all set. Check your inbox.
      </h2>

      <p
        style={{
          color: '#94A3B8',
          fontSize: '1.05rem',
          lineHeight: 1.5,
          maxWidth: '480px',
        }}
      >
        Your personalized business plan is on the way.
      </p>

      <a
        href="https://naslogic.com/#pricing"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '400px',
          padding: '18px 32px',
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontSize: '1.1rem',
          fontWeight: 700,
          cursor: 'pointer',
          textDecoration: 'none',
          marginTop: '16px',
          transition: 'all 200ms ease-out',
        }}
        onMouseDown={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = 'scale(0.98)'
        }}
        onMouseUp={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
        }}
      >
        See what we&apos;d build for you
      </a>

      <button
        type="button"
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#94A3B8',
          fontSize: '0.875rem',
          textDecoration: 'underline',
          cursor: 'pointer',
          padding: '8px',
          marginTop: '4px',
        }}
      >
        Close
      </button>
    </div>
  )
}
