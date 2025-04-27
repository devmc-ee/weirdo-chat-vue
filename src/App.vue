<script setup lang="ts">
import { PageContent } from './core/components'
import { ChatWidget } from './Chat/components'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <PageContent msg="Weirdo Chat!" />
      <ChatWidget />
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
