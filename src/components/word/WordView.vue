<template>
  <Teleport to="body">
    <Transition name="slide-right">
      <div
        v-if="show"
        ref="word-view"
        class="word-view"
      >
        <h1 class="word-title">
          <span v-if="title">Edit the word <span class="word-name">{{ title }}</span></span>
          <span v-else>Add a new word</span>
        </h1>

        <WordForm
          :word="word"
          @hide="$emit('hide-word')"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import WordForm from './WordForm.vue'
import { computed, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  show: Boolean,
  word: {
    type: [Object, null],
    required: true
  }
})

const emit = defineEmits([ 'hide-word' ])

const title = computed(() => {
  return props.word?.word || ''
})

const target = useTemplateRef('word-view')
const ignoreElSelector = '.table-row'
onClickOutside(
  target,
  () => emit('hide-word'),
  { ignore: [ignoreElSelector] })
</script>

<style scoped>
.word-view {
  position: absolute;
  right: 0;
  z-index: 999;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 64px;
  background-color: white;
  border-left: 2px solid rgba(0, 0, 0, 0.3);
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

.view-enter-from .word-view,
.view-leave-to .word-view {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.word-title {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
