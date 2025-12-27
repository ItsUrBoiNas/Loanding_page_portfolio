import type { CollectionConfig } from 'payload'

const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
  timestamps: true,
}

export default Clients









