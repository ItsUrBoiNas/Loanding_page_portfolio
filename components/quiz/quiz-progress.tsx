'use client'

interface QuizProgressProps {
  currentStep: number
  totalSteps: number
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div style={{ width: '100%', padding: '0 20px' }}>
      <p
        style={{
          color: '#94A3B8',
          fontSize: '0.75rem',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 500,
        }}
      >
        Step {currentStep} of {totalSteps}
      </p>
      <div
        style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            borderRadius: '2px',
            transition: 'width 500ms ease-out',
          }}
        />
      </div>
    </div>
  )
}
