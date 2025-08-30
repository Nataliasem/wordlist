<template>
  <div class="add-example__wrapper">
    <AppTextarea
      v-model="example"
      label="examples"
      :rows="10"
      id="examples"
    >
      <ol v-if="hasExamples">
        <li v-for="(item, index) in model" class="example-item">
          <button class="icon-button_filled" @click="deleteExample(index)">
            <v-icon name="ri-delete-bin-2-line" title="Delete from category" />
          </button>
          <span>{{ item }}</span>
        </li>
      </ol>
    </AppTextarea>

    <button class="icon-button_filled add-example-button" type="button" @click="addExample">
      <v-icon name="ri-play-list-add-fill" title="Add to wordlist" fill="purple" />
      <span>Add example</span>
    </button>
  </div>
</template>

<script setup>
import AppTextarea from './reusable/AppTextarea.vue'
import { computed, ref } from 'vue'

const model = defineModel({
  type: Array,
  default: []
})

const example = ref('')
const addExample = () => {
  if (!example.value) return
  model.value.unshift(example.value)
  example.value = ''
}
const deleteExample = (indexToRemove) => {
  model.value.splice(indexToRemove, 1)
}
const hasExamples = computed(() => {
  return model.value.length
})
</script>

<style scoped>
.add-example__wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.add-example__wrapper textarea {
  flex-grow: 1;
}

.add-example__wrapper button {
  align-self: flex-start;
}

li.example-item {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

li.example-item button {
  align-self: start;
}

.icon-button_filled.add-example-button {
  color: purple;
  display: flex;
  gap: 8px;
}
</style>
