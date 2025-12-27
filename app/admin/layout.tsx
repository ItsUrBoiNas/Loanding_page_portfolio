// Note: Admin layout is stubbed for static export compatibility
// Payload CMS admin requires server-side features and won't work with static export

export const metadata = {
  title: 'Admin',
  description: 'Admin panel (not available in static export)',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Panel Not Available</h1>
        <p className="text-slate-400">
          The Payload CMS admin panel requires server-side features and is not available in static export builds.
        </p>
      </div>
    </div>
  )
}

