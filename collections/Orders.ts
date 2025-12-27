import type { CollectionConfig } from 'payload'

const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => false,
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Purchase', value: 'purchase' },
        { label: 'Quote', value: 'quote' },
      ],
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Processing', value: 'processing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'paymentId',
      type: 'text',
    },
    {
      name: 'paypalOrderId',
      type: 'text',
    },
    {
      name: 'leadForm',
      type: 'relationship',
      relationTo: 'lead-forms',
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data.orderNumber) {
          const timestamp = Date.now()
          const random = Math.floor(Math.random() * 1000)
          data.orderNumber = `ORD-${timestamp}-${random}`
        }
        return data
      },
    ],
  },
}

export default Orders









