import { type Message as MessageParam } from '@/Chat/types'

export class Message {
  id = 0
  author = ''
  createdAt = new Date()
  text = ''
  isClient = false

  constructor({
    author,
    text,
    id,
    isClient,
    createdAt,
  }: Omit<MessageParam, 'createdAt'> & { createdAt?: Date }) {
    this.author = author
    this.text = text
    this.id = id
    this.isClient = isClient
    if (createdAt) {
      this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt
    }
  }
}
