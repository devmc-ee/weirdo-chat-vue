import { describe, it, expect } from 'vitest'
import chatService from '@/Chat/services/ChatService'
import { Message } from '@/Chat/models/Message'
import { CHAT_MEMBER } from '@/Chat/types'

describe('ChatService', () => {
  it.each([
    ['hi', 'Hi! How can we help you?'],
    ['hello', 'Hello! How can we help you?'],
    ['tere', 'Tere! Kuidas saame aidata?'],
    ['Tere', 'Tere! Kuidas saame aidata?'],
    ['Tere ', 'Tere! Kuidas saame aidata?'],
    ['Привет!', 'Привет! Как мы можем помочь вам?'],
    ['Hey!', 'Hey! How can we help you?'],
    ['Hei!', 'Hei! Kuidas saame aidata?'],
  ])('"%s" should be responded with "%s when it is the first contact"', (message, expected) => {
    const isFirstContact = true
    const response = chatService.getResponse(message, isFirstContact)

    expect(response).toBe(expected)
  })

  it('Should return reversed message', () => {
    const response = chatService.getReversed('Hello, how are you?')

    expect(response).toBe('?uoy era woh ,olleH')
  })

  it('Should return message with with reversed words', () => {
    const response = chatService.getReversedWords('Hello, how are you?')

    expect(response).toBe('olleH, woh era uoy?')
  })

  it('Should parse a serialized array of messages', () => {
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

    const serialized = JSON.stringify(messages)

    const parsed = chatService.parseMessages(serialized)
    expect(parsed).toStrictEqual(messages)
  })

  it('Should return empty array if nothing stored', () => {
    const parsed = chatService.parseMessages('')
    expect(parsed).toStrictEqual([])
  })
})
