import { GreetingResponseDictionary } from '../datasets/GreetingResponseDictionary'
import sha512 from 'crypto-js/sha512'
import { Message } from '../models/Message'
import storageService from '@/core/services/StorageService'
import type { StorageService } from '@/core/types'
import { CHAT_MEMBER } from '../types'
import type { Ref } from 'vue'

const { VITE_MAX_RANDOM_RESPONSE_AWAIT_TIME } = import.meta.env

class ChatService {
  private STORAGE_KEY = 'messages'

  constructor(
    public responseDictionary: Record<string, string>,
    public storageService: StorageService,
  ) { }

  handleSubmit(message: string, messages: Message[], typing: Ref<boolean, boolean>) {
    if (!message) return

    messages.push(
      new Message({
        author: CHAT_MEMBER.client,
        text: message,
        id: messages.length,
        isClient: true,
      }),
    )

    const isFirstContact = messages.length === 1
    const response = this.getResponse(message, isFirstContact)

    // imitation of typing process
    const RANDOM_START_TYPING_TIMEOUT =
      Math.floor(Math.random() * +VITE_MAX_RANDOM_RESPONSE_AWAIT_TIME) * 2
    const RANDOM_RESPONSE_TIMEOUT =
      Math.floor(Math.random() * +VITE_MAX_RANDOM_RESPONSE_AWAIT_TIME) + RANDOM_START_TYPING_TIMEOUT

    setTimeout(() => {
      typing.value = true
    }, RANDOM_START_TYPING_TIMEOUT)

    setTimeout(() => {
      messages.push(
        new Message({
          author: CHAT_MEMBER.customerService,
          text: response,
          id: messages.length,
          isClient: false,
        }),
      )
      typing.value = false
    }, RANDOM_RESPONSE_TIMEOUT)
  }

  getResponse(message: string, isFirstContact: boolean): string {
    if (isFirstContact) {
      const greeting = this.prepareMessage(message)

      if (greeting in this.responseDictionary) {
        return this.responseDictionary[greeting]
      }
    }

    return this.getRandomTransformation(message)
  }

  parseMessages(messages: string): Message[] {
    if (!messages?.trim()) return []

    const parsed = JSON.parse(messages)

    if (Array.isArray(parsed)) {
      parsed.forEach((message, i) => (parsed[i] = new Message(message)))
    }

    return parsed || []
  }

  store(messages: Message[]) {
    this.storageService.save(this.STORAGE_KEY, JSON.stringify(messages))
  }

  restore(): Message[] {
    const serialized = this.storageService.get(this.STORAGE_KEY)
    return this.parseMessages(serialized)
  }

  getReversed(message: string): string {
    return message.split('').reverse().join('')
  }

  getReversedWords(message: string): string {
    return message
      .split(' ')
      .map((word) => {
        const reversed: string[] = []

        word.split('').forEach((char) => {
          if (char.match(/[! _\-\?,\.]/gi)) {
            // keep order of non-word characters
            reversed.push(char)
          } else {
            reversed.unshift(char)
          }
        })

        return reversed.join('')
      })
      .join(' ')
  }

  getEncoded(message: string): string {
    return sha512(message).toString()
  }

  private getRandomTransformation(message: string): string {
    const methods = [this.getEncoded, this.getReversed, this.getReversedWords]
    const randomIndex = this.getRandomInt(0, methods.length - 1)

    return methods[randomIndex](message)
  }

  private prepareMessage(message: string): string {
    return message
      .trim()
      .toLocaleLowerCase()
      .replaceAll(/[! _\-\?,\.]/gim, '')
  }

  private getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
  }
}

export default new ChatService(GreetingResponseDictionary, storageService)
