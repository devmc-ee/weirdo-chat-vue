<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import chatService from '@/Chat/services/ChatService'
import { ModalWindow } from '@/core/components'
import { ChatMessagesPool, ChatInput } from '.'
import { Message } from '../models/Message'
import { CHAT_MEMBER } from '../types'

const { VITE_SHOW_MODAL_AFTER_MSEC, VITE_MAX_MESSAGES_IN_POOL } = import.meta.env

const SHOW_MODAL_AFTER_MSEC = VITE_SHOW_MODAL_AFTER_MSEC || 3000

const showModal = ref(false)
const inputDisabled = ref(false)
const typing = ref(false)
const messages = reactive<Message[]>(chatService.restore())

function submit(message: string) {
  chatService.handleSubmit(message, messages, typing)
}

onMounted(() =>
  setTimeout(() => {
    showModal.value = true
    inputDisabled.value = messages.length >= +VITE_MAX_MESSAGES_IN_POOL
  }, SHOW_MODAL_AFTER_MSEC),
)

watch(
  () => messages.length,
  (length) => {
    if (length === +VITE_MAX_MESSAGES_IN_POOL) {
      messages.push(
        new Message({
          author: CHAT_MEMBER.customerService,
          text: 'Ok, it is enough for today. Have a good day!',
          id: messages.length,
          isClient: false,
        }),
      )

      inputDisabled.value = true
    }
    // persist messages
    chatService.store(messages)
  },
)
</script>

<template>
  <Teleport to="body">
    <ModalWindow :show="showModal" @close="showModal = false">
      <template #header>
        <div class="chat-header">
          <h3>Chat ({{ messages.length }} /{{ VITE_MAX_MESSAGES_IN_POOL }})</h3>
        </div>
      </template>
      <template #body>
        <div class="chat-messages-pool-container">
          <ChatMessagesPool :messages="messages" :typing="typing" />
        </div>
      </template>
      <template #footer>
        <ChatInput @submit-message="submit" :disabled="inputDisabled" />
      </template>
    </ModalWindow>
  </Teleport>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.chat-header {
  padding: 0.5rem 1rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.chat-messages-pool-container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  position: absolute;
  bottom: 4rem;
  padding-top: 100px;
}

@media (min-width: 460px) {
  .chat-messages-pool-container {
    height: 600px;
    max-height: 90svh;
  }
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
