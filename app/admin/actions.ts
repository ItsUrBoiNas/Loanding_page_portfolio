// Note: Server actions are disabled for static export
// This file is stubbed out for static export compatibility
// Payload CMS admin requires server-side features and won't work with static export

import type { ServerFunctionClient, ServerFunctionClientArgs } from 'payload'

export const serverFunction: ServerFunctionClient = async (args: ServerFunctionClientArgs) => {
  // Stub function for static export - admin panel won't work in static export
  throw new Error('Server actions are not available in static export. Admin panel requires server-side features.')
}

