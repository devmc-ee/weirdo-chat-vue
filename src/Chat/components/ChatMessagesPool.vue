<script setup lang="ts">
import { Message } from '../models/Message'
import { ChatMessage } from '.'

defineProps<{
  messages: Message[]
  typing: boolean
}>()
</script>

<template>
  <div v-if="messages.length === 0" class="pool-placeholder">How can we help you?</div>
  <TransitionGroup name="messages-pool" class="chat-messages-pool" tag="ul">
    <li v-for="item in messages" :key="item.id">
      <ChatMessage :message="item" />
    </li>
    <div v-if="typing" class="pool-action">Typing...</div>
  </TransitionGroup>
</template>

<style scoped>
.pool-placeholder {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: var(--border-gray);
}

.chat-messages-pool {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
}

.chat-messages-pool li {
  list-style: none;
}

.messages-pool-move,
.messages-pool-enter-active,
.cmessages-pool-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.messages-pool-enter-from,
.messages-pool-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.pool-action {
  font-size: 10px;
}
</style>
