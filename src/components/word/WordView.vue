<template>
  <Teleport to="body">
    <Transition name="slide-right">
      <div
        v-if="show"
        ref="word-view"
        class="word-view"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'

const { show = false } = defineProps<{
  show?: boolean
}>()

const emit = defineEmits<{
  hide: []
}>()

const target = useTemplateRef('word-view')
const ignoreElSelectors = ['.table-row', '#add-word-button']
onClickOutside(
  target,
  () => emit('hide'),
  { ignore: ignoreElSelectors })
</script>

<style scoped>
.word-view {
  position: fixed;
  right: 0;
  z-index: 999;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  background-color: white;
  border-left: 2px solid rgba(0, 0, 0, 0.3);
  box-shadow: -2px 0 15px 0 rgba(0, 0, 0, 0.3);
  overflow: scroll;
}

/* Special styles for Transition component */
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.5s ease-out;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.view-enter-from .word-view,
.view-leave-to .word-view {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
