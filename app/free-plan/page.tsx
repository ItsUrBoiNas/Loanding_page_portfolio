import { Metadata } from 'next'
import FreePlanClient from './free-plan-client'

export const metadata: Metadata = {
  title: 'Free Business Plan | Naslogic',
  description:
    'Answer 5 quick questions and get a custom business plan for your business. Free. No commitment.',
  openGraph: {
    title: 'Get Your Free Business Plan | Naslogic',
    description:
      'Answer 5 quick questions and get a custom business plan. Free. No commitment.',
    url: 'https://naslogic.com/free-plan',
  },
}

export default function FreePlanPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      {/* Minimal branding */}
      <a
        href="/"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          color: 'rgba(255, 255, 255, 0.4)',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.875rem',
          letterSpacing: '-0.03em',
          zIndex: 50,
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        NASLOGIC
      </a>

      <FreePlanClient />
    </div>
  )
}
