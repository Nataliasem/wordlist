<script setup lang="ts">
import { reloadPage } from '@/utils'
import { MessageType } from '@/constants'

defineProps<{
  message: {
    type: string
    text: string
  }
}>()
</script>

<template>
  <p class="bg-violet-100 p-4 rounded-sm border-2 border-violet-300 text-center">
    <span>{{ message.text }}</span>
    <span v-if="message.type === MessageType.Error">
      Please <a @click="reloadPage">reload the page</a>.
    </span>
  </p>
</template>
