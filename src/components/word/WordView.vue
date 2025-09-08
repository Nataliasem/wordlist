<template>
  <Teleport to="body">
    <Transition name="slide-right">
      <div
        v-if="show"
        class="word-view"
        ref="word-view"
      >
        <h1 class="word-title">
          <span>{{ word.word }}</span>
          <span class="flex-center cursor-pointer" @click="isReadonly = !isReadonly">
            <v-icon
              name="ri-pencil-line"
              title="Edit word"
              scale="2"
            />
          </span>
        </h1>

        <template v-if="isReadonly">
          <h3>Transcription</h3>
          <p v-if="word.transcription">{{ word.transcription }}</p>
          <a v-else href="#" @click="isReadonly = false">Add transcription</a>

          <h3>Definition</h3>
          <p v-if="word.definition">{{ word.definition }}</p>
          <a v-else href="#" @click="isReadonly = false">Add definition</a>

          <h3>Translation</h3>
          <p v-if=" word.translation">{{ word.translation }}</p>
          <a v-else href="#" @click="isReadonly = false">Add translation</a>

          <h3>Examples of using</h3>
          <ul v-if="hasExamples">
            <li v-for="item in word.examples" :key="item">{{ item }}</li>
          </ul>
          <a v-else href="#" @click="isReadonly = false">Add example</a>
        </template>

        <WordForm
          v-else
          :word="word"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import WordForm from './WordForm.vue'
import { ref, computed, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  show: Boolean,
  word: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([ 'hide-word' ])

const hasExamples = computed(() => {
  return (props.word.examples || []).length > 0
})

const isReadonly = ref(true)

const target = useTemplateRef('word-view')
onClickOutside(target, () => {
  emit('hide-word')
})
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
