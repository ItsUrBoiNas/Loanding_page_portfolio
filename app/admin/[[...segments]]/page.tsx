export async function generateStaticParams() {
  // Return at least one path for catch-all route compatibility with static export
  // Note: Admin panel requires server-side features and won't work in static export
  return [{ segments: [] }]
}

export default async function AdminPage() {
  // Payload CMS admin UI is rendered by RootLayout in layout.tsx
  // This page component is required by Next.js but content comes from layout
  return <div />
}

