const nextConfig = {
  // output: 'export', // Disabled to allow API routes
  images: {
    domains: [],
  },
  async rewrites() {
    return [
      { source: '/', destination: '/naslogic.html' },
      { source: '/dental', destination: '/dental.html' },
      { source: '/ecommerce', destination: '/ecommerce.html' },
      { source: '/fitness', destination: '/fitness.html' },
      { source: '/hvac', destination: '/hvac.html' },
      { source: '/legal', destination: '/legal.html' },
      { source: '/naslogic', destination: '/naslogic.html' },
      { source: '/plumbing', destination: '/plumbing.html' },
      { source: '/realestate', destination: '/realestate.html' },
      { source: '/restaurants', destination: '/restaurants.html' },
      { source: '/roofing', destination: '/roofing.html' },
      { source: '/saas', destination: '/saas.html' },
      { source: '/experience', destination: '/experience.html' },
    ];
  },
}

module.exports = nextConfig
