<script setup lang="ts">
import { reloadPage } from '@/utils/index.js'
import { MessageType } from '@/constants'

defineProps<{
  message: {
    type: string
    style: string
    text: string
  }
}>()
</script>

<template>
  <p class="bg-violet-100 p-4 rounded-sm border-2 border-violet-300 text-center">
    <span :class="message.style">
      <span>{{ message.text }}</span>
      <span v-if="message.type === MessageType.Error">
        Please <a @click="reloadPage">reload the page</a>.
      </span>
    </span>
  </p>
</template>
