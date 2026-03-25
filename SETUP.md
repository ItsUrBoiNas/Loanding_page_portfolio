# Landing Page Portfolio - Setup Guide

A high-converting landing page portfolio built with Next.js, featuring email notifications via Resend, file uploads to Cloudflare R2, and PayPal payment processing.

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

## Features

### Forms
- **Purchase Now**: Single-page landing page for $199 (2-day turnaround)
- **Get A Quote**: Request quote for multi-page sites with budget and timeline
- Both forms support file uploads (references/designs)

### Payment Processing
- PayPal Checkout integration
- Automatic email confirmations on payment

### File Uploads
- Files stored in Cloudflare R2
- Supports images, PDFs, and documents

## API Routes

- `POST /api/contact` - Submit contact form
- `POST /api/lead-form` - Submit quote/purchase form
- `POST /api/upload` - Upload files
- `POST /api/paypal/create-order` - Create PayPal order
- `POST /api/paypal/capture-order` - Capture PayPal payment

## Troubleshooting

### Email Not Sending
- Check Resend API key in environment variables
- Verify `ADMIN_EMAIL` is set correctly

### File Upload Issues
- Verify R2 credentials are configured
- Check R2 bucket exists and has correct permissions

### PayPal Issues
- Ensure PayPal credentials are correct
- Check PayPal mode (sandbox vs live)
