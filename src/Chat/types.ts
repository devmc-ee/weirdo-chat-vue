export interface Message {
  id: number
  author: string
  createdAt: Date
  text: string
  isClient: boolean
}

export const CHAT_MEMBER = {
  client: 'Client',
  customerService: 'Customer Service',
} as const

export interface ChatServiceParams {
  authorName: (typeof CHAT_MEMBER)[keyof typeof CHAT_MEMBER]
}
