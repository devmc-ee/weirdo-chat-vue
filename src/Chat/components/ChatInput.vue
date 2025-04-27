<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{
  disabled: boolean
}>()

const emit = defineEmits(['submitMessage'])

const inputRef = ref<HTMLInputElement | null>(null)
const message = ref('')

const submit = () => {
  emit('submitMessage', message.value)
  message.value = ''
  inputRef.value?.focus()
}

onMounted(() => {
  inputRef.value?.focus()

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      submit()
    }

    if (event.code === 'Backspace') {
      message.value = message.value.slice(0, -1)
    }
  })
})
</script>

<template>
  <div class="chat-input-container">
    <input
      class="chat-input"
      v-model="message"
      :disabled="disabled"
      type="text"
      ref="inputRef"
      placeholder="Your message..."
    />
    <button class="chat-submit-button" @click="submit" :disabled="message.length < 1 || disabled">
      <img
        alt="Send message"
        class="chat-submit-icon"
        src="@/assets/logo.svg"
        width="32"
        height="32"
      />
    </button>
  </div>
</template>

<style scoped>
.chat-input-container {
  display: flex;
  padding: 1rem 0.8rem;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
}

.chat-input {
  line-height: 1.5;
  font-size: 16px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: none;
  outline: 1px solid var(--border-gray);
}

.chat-input::placeholder {
  color: var(--border-gray);
}

.chat-input:focus-visible {
  outline: 1px solid var(--border-gray);
}

.chat-submit-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
}

.chat-submit-button:hover {
  transform: scale(1.1);
  transition: all 0.5s;
}

.chat-submit-button:disabled .chat-submit-icon {
  filter: grayscale(1);
}

.chat-submit-icon {
  transform: rotate(-90deg);
}
</style>
