import { buildConfig } from 'payload'
import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
// Cloud storage temporarily disabled - will configure after fixing build
// import { s3Storage } from '@payloadcms/storage-s3'

import ContactFormSubmissions from './collections/ContactFormSubmissions'
import Clients from './collections/Clients'
import Orders from './collections/Orders'
import LeadForms from './collections/LeadForms'
import Settings from './collections/Settings'
import Media from './collections/Media'
import Users from './collections/Users'

// Validate DATABASE_URI early - this will throw immediately if missing
const rawDatabaseUri = process.env.DATABASE_URI

if (!rawDatabaseUri) {
  console.error('❌ FATAL: DATABASE_URI is not set in environment variables', process.env)
  console.error('Please add DATABASE_URI=postgresql://... to your .env.local file')
  throw new Error('DATABASE_URI environment variable is required but not set. Please set it in your .env.local file.')
}

const dbConnectionString = rawDatabaseUri.trim()

if (!dbConnectionString) {
  console.error('❌ FATAL: DATABASE_URI is set but empty or whitespace only')
  throw new Error('DATABASE_URI is set but is empty or contains only whitespace.')
}

if (!dbConnectionString.startsWith('postgresql://') && !dbConnectionString.startsWith('postgres://')) {
  console.error('❌ FATAL: DATABASE_URI format is invalid')
  console.error(`Expected format: postgresql://user:password@host:port/database`)
  console.error(`Got: ${dbConnectionString.substring(0, 50)}...`)
  throw new Error(`DATABASE_URI must start with 'postgresql://' or 'postgres://'. Got: ${dbConnectionString.substring(0, 30)}...`)
}

console.log('✅ DATABASE_URI is valid')

const config = buildConfig({
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
  collections: [
    Users,
    ContactFormSubmissions,
    Clients,
    Orders,
    LeadForms,
    Media,
  ],
  globals: [
    Settings,
  ],
  plugins: [
    // Cloud storage temporarily disabled - will configure after fixing build
    // s3Storage({
    //   collections: {
    //     media: {
    //       prefix: 'media',
    //     },
    //   },
    //   bucket: process.env.R2_BUCKET_NAME || 'payload-media',
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    //       secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    //     },
    //     endpoint: process.env.R2_ENDPOINT || (process.env.R2_ACCOUNT_ID ? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com` : undefined),
    //     region: 'auto',
    //     forcePathStyle: true,
    //   },
    // }),
  ],
  db: (() => {
    // Final validation - ensure connection string is definitely valid
    const connStr = String(dbConnectionString || '').trim()

    if (!connStr || connStr.length === 0) {
      console.error('❌ FATAL: Connection string is empty when creating adapter')
      throw new Error('DATABASE_URI is empty when creating postgres adapter')
    }

    if (!connStr.startsWith('postgresql://') && !connStr.startsWith('postgres://')) {
      console.error('❌ FATAL: Connection string format invalid:', connStr.substring(0, 50))
      throw new Error(`DATABASE_URI must start with postgresql:// or postgres://`)
    }

    console.log('✅ Creating postgresAdapter with valid connection string')

    return postgresAdapter({
      pool: {
        connectionString: connStr,
      },
    })
  })(),
  admin: {
    user: 'users',
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET || '',
})

const configPromise = Promise.resolve(config)

export default configPromise

