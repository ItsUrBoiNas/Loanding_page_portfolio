import type { CollectionConfig } from 'payload'

const LeadForms: CollectionConfig = {
  slug: 'lead-forms',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => false,
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
      required: true,
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
      name: 'needs',
      type: 'textarea',
      required: true,
      label: 'Describe Your Needs',
    },
    {
      name: 'references',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'formType',
      type: 'select',
      options: [
        { label: 'Get A Quote', value: 'quote' },
        { label: 'Purchase Now', value: 'purchase' },
      ],
      required: true,
      defaultValue: 'quote',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quote Sent', value: 'quote-sent' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'new',
    },
  ],
  timestamps: true,
}

export default LeadForms









