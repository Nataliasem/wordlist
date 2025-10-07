<script setup lang="ts">
import { AppFormInput } from '@/components/common'
import { computed, ref } from 'vue'

const model = defineModel<string[]>({ default: () => [] })

const example = ref('')
const addExample = () => {
  if (!example.value) return
  model.value.unshift(example.value)
  example.value = ''
}
const deleteExample = (indexToRemove: number) => {
  model.value.splice(indexToRemove, 1)
}
const hasExamples = computed(() => {
  return model.value.length
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <AppFormInput
      is="textarea"
      id="examples"
      v-model="example"
      label="examples"
    >
      <ol v-if="hasExamples">
        <li
          v-for="(item, index) in model"
          :key="item"
          class="flex gap-2 mb-2"
        >
          <button
            type="button"
            class="cursor-pointer"
            @click="deleteExample(index)"
          >
            <v-icon
              name="ri-delete-bin-2-line"
              title="Delete from category"
            />
          </button>
          <span>{{ item }}</span>
        </li>
      </ol>
    </AppFormInput>

    <button
      class="px-1 self-start cursor-pointer text-purple-700 hover:text-purple-500 focus:outline-purple-700"
      type="button"
      @click="addExample"
    >
      <v-icon
        name="ri-play-list-add-fill"
        title="Add to wordlist"
      />
      <span class="ml-1">Add example</span>
    </button>
  </div>
</template>
