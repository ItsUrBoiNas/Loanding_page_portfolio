import { getPayload } from 'payload'
import configPromise from '@/payload.config'

let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
    if (cachedPayload) {
        return cachedPayload
    }

    try {
        const config = await configPromise
        cachedPayload = await getPayload({ config })
        return cachedPayload
    } catch (error) {
        console.error('Failed to initialize Payload:', error)
        throw error
    }
}
