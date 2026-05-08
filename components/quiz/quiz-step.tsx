'use client'

interface QuizStepProps {
  question: string
  subtitle?: string
  children: React.ReactNode
  onContinue?: () => void
  showContinue?: boolean
  helperText?: string
}

export function QuizStep({
  question,
  subtitle,
  children,
  onContinue,
  showContinue,
  helperText,
}: QuizStepProps) {
  return (
    <div
      style={{
        maxWidth: '672px',
        margin: '0 auto',
        width: '100%',
        padding: '0 20px',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
          fontWeight: 600,
          color: '#fff',
          marginBottom: subtitle ? '12px' : '16px',
          lineHeight: 1.2,
        }}
      >
        {question}
      </h2>

      {subtitle && (
        <p
          style={{
            color: '#94A3B8',
            fontSize: '1rem',
            marginBottom: '8px',
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      )}

      {helperText && (
        <p
          style={{
            color: '#64748B',
            fontSize: '0.875rem',
            marginBottom: '24px',
          }}
        >
          {helperText}
        </p>
      )}

      {!helperText && !subtitle && <div style={{ height: '8px' }} />}
      {!helperText && subtitle && <div style={{ height: '16px' }} />}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {children}
      </div>

      {showContinue && onContinue && (
        <button
          type="button"
          onClick={onContinue}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 200ms ease-out',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Continue
        </button>
      )}
    </div>
  )
}
