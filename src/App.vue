<script setup lang="ts">
import CategoryList from './components/category/CategoryList.vue'
import WordList from './components/word/WordList.vue'
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const isExpanded = ref(true)
const TABLET_SCREEN_SIZE = 1024
if(width.value < TABLET_SCREEN_SIZE) {
  isExpanded.value = false
}
</script>

<template>
  <nav class="h-16 border-b border-gray-200 px-4 flex items-center justify-between">
    <button
      class="app-button app-button__bordered"
      type="button"
      @click="isExpanded = !isExpanded"
    >
      <v-icon
        :name="isExpanded ? 'ri-arrow-left-line' : 'ri-arrow-right-line'"
        :scale="1.3"
        title="expand category list"
        fill="purple"
      />
    </button>
    <h1 class="text-2xl text-purple-900">
      Wordlist
    </h1>
  </nav>
  <main class="flex h-full w-full">
    <CategoryList v-if="isExpanded" />
    <WordList />
  </main>
</template>
