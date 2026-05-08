'use client'

import { Check } from 'lucide-react'

interface QuizOptionCardProps {
  label: string
  selected: boolean
  onClick: () => void
  mode: 'single' | 'multi'
}

export function QuizOptionCard({ label, selected, onClick, mode }: QuizOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="quiz-option-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        minHeight: '56px',
        padding: '16px 20px',
        background: selected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${selected ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)'}`,
        borderRadius: '12px',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 500,
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 200ms ease-out',
        transform: selected ? 'scale(1)' : undefined,
        outline: 'none',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.transform = 'scale(1.02)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
        }
      }}
    >
      {mode === 'multi' && (
        <div
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '6px',
            border: `2px solid ${selected ? '#3B82F6' : 'rgba(255, 255, 255, 0.2)'}`,
            background: selected ? '#3B82F6' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 200ms ease-out',
          }}
        >
          {selected && <Check size={14} color="#fff" strokeWidth={3} />}
        </div>
      )}
      <span style={{ flex: 1 }}>{label}</span>
      {selected && mode === 'single' && (
        <div
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: '#3B82F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'opacity 200ms ease-out',
          }}
        >
          <Check size={14} color="#fff" strokeWidth={3} />
        </div>
      )}
    </button>
  )
}
