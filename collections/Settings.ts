import type { GlobalConfig } from 'payload'

const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'useCloudflareEmail',
      type: 'checkbox',
      label: 'Use Cloudflare Email',
      defaultValue: false,
    },
    {
      name: 'cloudflareEmailConfig',
      type: 'group',
      fields: [
        {
          name: 'apiToken',
          type: 'text',
          label: 'Cloudflare Email API Token',
          admin: {
            description: 'API token for Cloudflare Email Workers',
          },
        },
        {
          name: 'fromEmail',
          type: 'email',
          label: 'From Email Address',
        },
        {
          name: 'fromName',
          type: 'text',
          label: 'From Name',
        },
      ],
      admin: {
        condition: (data) => data.useCloudflareEmail === true,
      },
    },
    {
      name: 'resendApiKey',
      type: 'text',
      label: 'Resend API Key',
      admin: {
        description: 'API key for Resend email service (used when Cloudflare Email is disabled)',
      },
    },
    {
      name: 'defaultFromEmail',
      type: 'email',
      label: 'Default From Email',
      required: true,
    },
    {
      name: 'defaultFromName',
      type: 'text',
      label: 'Default From Name',
      defaultValue: 'Landing Page Portfolio',
    },
  ],
}

export default Settings









