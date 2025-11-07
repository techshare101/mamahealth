import { set, get, del, keys } from 'idb-keyval'

const CACHE_LIMIT = 5
const CACHE_PREFIX = 'mama-voice-'

export interface VoiceCacheEntry {
  id: string
  lang: string
  text: string
  blob: Blob
  ts: string
  voiceLabel?: string
}

/**
 * Save a voice audio blob to IndexedDB cache
 * Automatically manages cache size (keeps last 5 entries)
 */
export async function saveVoiceToCache(
  lang: string,
  text: string,
  blob: Blob,
  voiceLabel?: string
): Promise<void> {
  try {
    const id = `${CACHE_PREFIX}${Date.now()}`
    const entry: VoiceCacheEntry = {
      id,
      lang,
      text,
      blob,
      ts: new Date().toISOString(),
      voiceLabel,
    }

    await set(id, entry)

    // Keep only last CACHE_LIMIT entries
    const allKeys = (await keys()).filter((k) =>
      String(k).startsWith(CACHE_PREFIX)
    )
    if (allKeys.length > CACHE_LIMIT) {
      const sortedKeys = allKeys.sort()
      const toDelete = sortedKeys.slice(0, allKeys.length - CACHE_LIMIT)
      await Promise.all(toDelete.map((k) => del(k)))
    }
  } catch (error) {
    console.error('Error saving voice to cache:', error)
  }
}

/**
 * Find a cached voice blob matching the exact text
 * Returns the most recent match
 */
export async function findMatchingVoice(text: string): Promise<Blob | null> {
  try {
    const allKeys = (await keys()).filter((k) =>
      String(k).startsWith(CACHE_PREFIX)
    )
    
    // Search in reverse order (most recent first)
    for (const k of allKeys.reverse()) {
      const entry = (await get(k)) as VoiceCacheEntry | undefined
      if (entry && entry.text === text) {
        return entry.blob
      }
    }
    return null
  } catch (error) {
    console.error('Error finding cached voice:', error)
    return null
  }
}

/**
 * Get all cached voice entries, sorted by timestamp (newest first)
 */
export async function getAllCachedVoices(): Promise<VoiceCacheEntry[]> {
  try {
    const allKeys = (await keys()).filter((k) =>
      String(k).startsWith(CACHE_PREFIX)
    )
    const results: VoiceCacheEntry[] = []

    for (const k of allKeys) {
      const entry = (await get(k)) as VoiceCacheEntry | undefined
      if (entry) {
        results.push(entry)
      }
    }

    return results.sort((a, b) => (a.ts < b.ts ? 1 : -1))
  } catch (error) {
    console.error('Error getting cached voices:', error)
    return []
  }
}

/**
 * Clear all cached voice entries
 */
export async function clearVoiceCache(): Promise<void> {
  try {
    const allKeys = (await keys()).filter((k) =>
      String(k).startsWith(CACHE_PREFIX)
    )
    await Promise.all(allKeys.map((k) => del(k)))
  } catch (error) {
    console.error('Error clearing voice cache:', error)
  }
}

/**
 * Get cache statistics
 */
export async function getVoiceCacheStats(): Promise<{
  count: number
  totalSize: number
  oldestEntry?: string
  newestEntry?: string
}> {
  try {
    const entries = await getAllCachedVoices()
    const totalSize = entries.reduce((sum, entry) => sum + entry.blob.size, 0)

    return {
      count: entries.length,
      totalSize,
      oldestEntry: entries[entries.length - 1]?.ts,
      newestEntry: entries[0]?.ts,
    }
  } catch (error) {
    console.error('Error getting cache stats:', error)
    return { count: 0, totalSize: 0 }
  }
}

/**
 * Check if a voice is cached for given text
 */
export async function isVoiceCached(text: string): Promise<boolean> {
  const cached = await findMatchingVoice(text)
  return cached !== null
}
