<script setup lang="ts">
defineProps({
  show: Boolean,
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <slot name="body" class="modal-body">No content</slot>
        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="$emit('close')">OK</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
  padding: 1rem;
  justify-content: flex-end;
  align-items: flex-end;
}

.modal-container {
  color: var(--vt-c-black);
  width: 100%;
  height: calc(98% - env(safe-area-inset-bottom));
  max-height: calc(90svh - env(safe-area-inset-bottom));
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.modal-header {
  background-color: white;
  z-index: 2;
  position: relative;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 * source:
 * https://vuejs.org/examples/#modal
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media (min-width: 460px) {
  .modal-container {
    width: 400px;
    height: var(--modal-default-height, 600px);
    max-height: 90svh;
    overflow: hidden;
  }
}
</style>
