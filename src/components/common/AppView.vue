<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'

const { show = false, ignoreElSelectors = [] } = defineProps<{
  show?: boolean
  ignoreElSelectors?: string[]
}>()

const emit = defineEmits<{
  hide: []
}>()

const target = useTemplateRef('app-view')
onClickOutside(
  target,
  () => emit('hide'),
  { ignore: ignoreElSelectors })
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-right">
      <div
        v-if="show"
        ref="app-view"
        class="app-view"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@reference "tailwindcss";

.app-view {
  @apply z-999 fixed right-0 overflow-scroll;
  @apply flex flex-col h-full lg:w-2/5 px-8 bg-white;
  box-shadow: -2px 0 15px 0 rgba(0, 0, 0, 0.3);
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

.view-enter-from .app-view,
.view-leave-to .app-view {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
