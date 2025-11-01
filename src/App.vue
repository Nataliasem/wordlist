<script setup lang="ts">
import CategoryList from './components/category/CategoryList.vue'
import WordList from './components/word/WordList.vue'
import { useExpanded } from '@/composables'

const { isExpanded } = useExpanded()
</script>

<template>
  <div>
    <aside class="fixed h-full z-1000">
      <CategoryList />
    </aside>

    <div
      class="fixed top-0 lg:ml-(--sidebar-compressed)"
      :class="isExpanded ? 'lg:w-(--width-sidebar-expanded) lg:ml-(--sidebar-expanded)': 'ml-(--sidebar-compressed) w-(--width-sidebar-compressed)'"
    >
      <nav class="h-16 border-b border-gray-200 px-4 flex items-center justify-end">
        <h1 class="text-2xl text-purple-900">
          Wordlist
        </h1>
      </nav>

      <main>
        <WordList />
      </main>
    </div>
  </div>
</template>
