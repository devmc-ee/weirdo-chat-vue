<script setup lang="ts">
import type { Message } from '../types'
import IconEcosystem from '@/assets/icons/IconEcosystem.vue'
defineProps<{
  message: Message
}>()
</script>

<template tag="li">
  <div
    class="chat-message-container"
    :class="{ 'chat-message-container--client': message.isClient }"
  >
    <div class="chat-message-avatar" :class="{ 'chat-message-avatar--client': message.isClient }">
      <IconEcosystem />
    </div>
    <div class="chat-message-content-container">
      <div class="chat-message__author">{{ message.author }}</div>
      <div class="chat-message__text">{{ message.text }}</div>
    </div>
  </div>
</template>

<style scoped>
.chat-message-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.chat-message-container--client {
  flex-direction: row-reverse;
}

.chat-message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: var(--secondary-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
}

.chat-message-avatar--client {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-message__author {
  font-size: 10px;
  text-align: left;
}

.chat-message__text {
  padding: 0.5rem 1rem;
  /* border: 1px solid var(--border-gray); */
  border-radius: 8px;
  border-top-left-radius: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 15px;
  word-wrap: break-word;
  word-break: break-all;
}

.chat-message-container--client .chat-message__text {
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  border-top-right-radius: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 15px;
}

.chat-message-container--client .chat-message__author {
  text-align: right;
}
</style>
