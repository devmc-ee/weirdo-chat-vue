import { describe, it, expect, beforeEach } from 'vitest'
import storageService from '@/core/services/StorageService'
import chatService from '@/Chat/services/ChatService'
import { Message } from '@/Chat/models/Message'
import { CHAT_MEMBER } from '@/Chat/types'

const { VITE_CHAT_STORAGE_NAME } = import.meta.env

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear()
    storageService.initStore()
  })

  it('Should return empty store', () => {
    const response = storageService.getStore()
    expect(response).toStrictEqual({ [VITE_CHAT_STORAGE_NAME]: {} })
  })

  it('Should restore and clear saved items', () => {
    const messages = [
      new Message({
        author: CHAT_MEMBER.client,
        isClient: true,
        text: 'Hello',
        id: 1,
        createdAt: new Date(2025, 3, 27, 12, 0, 0),
      }),
      new Message({
        author: CHAT_MEMBER.customerService,
        isClient: false,
        text: 'Hello',
        id: 2,
        createdAt: new Date(2025, 3, 27, 12, 0, 15),
      }),
    ]
    storageService.save('messages', JSON.stringify(messages))
    let restoredMessages = storageService.get('messages')

    expect(chatService.parseMessages(restoredMessages)).toStrictEqual(messages)
    storageService.clear('messages')
    restoredMessages = storageService.get('messages')
    expect(chatService.parseMessages(restoredMessages)).toStrictEqual([])
  })
})
