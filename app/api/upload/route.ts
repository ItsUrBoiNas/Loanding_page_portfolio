import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

// Force Node.js runtime for database access
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  let payload
  try {
    payload = await getPayloadClient()
  } catch (initError) {
    console.error('Upload: Failed to initialize Payload:', initError)
    return NextResponse.json(
      { error: 'Database connection failed', details: String(initError) },
      { status: 503 }
    )
  }

  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    const uploadedIds: string[] = []

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const uploadedFile = await payload.create({
        collection: 'media',
        data: {
          alt: file.name,
        },
        file: {
          data: buffer,
          mimetype: file.type,
          name: file.name,
          size: file.size,
        },
      })

      uploadedIds.push(String(uploadedFile.id))
    }

    return NextResponse.json(
      { success: true, ids: uploadedIds },
      { status: 201 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload files', details: String(error) },
      { status: 500 }
    )
  }
}









