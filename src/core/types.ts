export interface StorageService {
  save(key: string, value: string): void
  get(key: string): string
  clear(key: string): void
}

export type StoreMeta = {
  updatedAt: Date
}
