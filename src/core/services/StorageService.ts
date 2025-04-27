const { VITE_CHAT_STORAGE_NAME, VITE_CHAT_STORAGE_TTL_MIN } = import.meta.env
import { add, isBefore } from 'date-fns'
import type { StorageService as IStorageService, StoreMeta } from '../types'

class StorageService implements IStorageService {
  private store: Record<string, unknown> = {}
  private storeMeta: StoreMeta = {
    updatedAt: new Date(),
  }
  private storeName: string = ''
  private storeMetaKey: string = ''
  private storageTtl = 1

  constructor(name: string, ttl: number) {
    if (!name) {
      throw new Error('Invalid storage name')
    }

    this.storeName = name
    this.storeMetaKey = `${this.storeName}__meta`

    this.storageTtl = ttl
    this.initStore()
  }

  initStore() {
    const storeMeta = localStorage.getItem(this.storeMetaKey)

    if (!storeMeta) {
      this.storeMeta = {
        updatedAt: new Date(),
      }
      localStorage.setItem(this.storeMetaKey, JSON.stringify(this.storeMeta))
    } else {
      try {
        this.processStorageReset(JSON.parse(storeMeta) as StoreMeta)
      } catch (e) {
        console.error('Failed to process storage cleaning', e)
      }
    }

    const store = localStorage.getItem(this.storeName)
    if (store) {
      try {
        this.store = JSON.parse(store)
      } catch (e) {
        console.error('Failed to init store', e)
      }
    } else {
      this.store = { [this.storeName]: {} }
      localStorage.setItem(this.storeName, JSON.stringify(this.store[this.storeName]))
    }
  }

  getStore() {
    if (!Object.keys(this.store).length) {
      this.initStore()
    }

    return this.store
  }

  getStoreName() {
    return this.storeName
  }

  save(key: string, value: string) {
    localStorage.setItem(
      this.storeName,
      JSON.stringify({
        [key]: value,
      }),
    )

    this.updateStoreMeta()
  }

  get(key: string): string {
    const store = localStorage.getItem(this.storeName)
    if (store) {
      try {
        const obj = JSON.parse(store)

        return obj[key] || ''
      } catch (e) {
        console.error(`Failed to parse store with key "${key}"`, { store, e })
      }
    }

    return ''
  }

  clear(key: string): void {
    const store = localStorage.getItem(this.storeName)
    if (store) {
      try {
        const obj = JSON.parse(store)

        if (obj[key]) {
          obj[key] = ''
          this.save(key, JSON.stringify(obj[key]))

          this.updateStoreMeta()
        }
      } catch (e) {
        console.error(`Failed to parse store with key "${key}"`, { store, e })
      }
    }
  }

  updateStoreMeta() {
    localStorage.setItem(
      this.storeMetaKey,
      JSON.stringify({
        updatedAt: new Date(),
      }),
    )
  }

  processStorageReset(storeMeta: StoreMeta) {
    const { updatedAt } = storeMeta
    const lastUpdatedAt = new Date(updatedAt)
    const validUntil = add(lastUpdatedAt, { minutes: +this.storageTtl })

    if (isBefore(validUntil, new Date())) {
      localStorage.removeItem(this.storeName)
    }
  }
}

export default new StorageService(VITE_CHAT_STORAGE_NAME, VITE_CHAT_STORAGE_TTL_MIN)
