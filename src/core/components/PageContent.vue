<script setup lang="ts">
defineProps<{
  msg: string
}>()

const { VITE_MAX_MESSAGES_IN_POOL } = import.meta.env
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Powered by
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
    <div class="page-content">
      <p>It is a "weirdo" chat simulation. If a conversation is initiated with a polite greeting in English, Estonian,
        or Russian, the system will try to respond correspondingly.</p>
      <p>Otherwise, it will respond by modifying your message using one of the following methods:</p>
      <ul>
        <li>Reversing the entire sentence.</li>
        <li>Reversing the letters within each word (while preserving the original word order).</li>
        <li>Encoding the message using the SHA-512 algorithm.</li>
      </ul>

      The conversation is limited by the {{ VITE_MAX_MESSAGES_IN_POOL }} messages.
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.page-content {
  max-width: 600px;
}

.page-content p {
  padding-bottom: 1rem;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
