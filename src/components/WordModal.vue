<template>
  <AppModal
    @confirm="save"
    @cancel="$emit('close-modal')"
  >
    <template #header>
      Edit the word <span class="word-name">{{ word.word }}</span>
    </template>

    <template #content>
      <form @submit.prevent class="word-form">
        <template v-for="key in FORM_CONFIG">
          <div v-if="key === 'category'" class="form-field">
            <label :for="key" class="word-form__label">{{ key }}: </label>
            <AppSelect
              v-model="updatedWord.category"
              :select-name="key"
              :options="categoryStore.categories"
            />
          </div>

          <div v-else-if="key === 'examples'" class="form-field">
            <label :for="key" class="word-form__label">{{ key }}: </label>
            <ol v-if="hasExamples">
              <li v-for="(item, index) in updatedWord[key]" class="example-item">
                <button class="icon-button_filled" @click="deleteExample(index)">
                  <v-icon name="ri-delete-bin-2-line" title="Delete from category" />
                </button>
                <span>{{ item }}</span>
              </li>
            </ol>

            <div class="add-example__wrapper">
              <textarea
                v-model="example"
                rows="10"
                :name="key"
                :id="key"
              />
              <button class="icon-button_filled add-example-button" type="button" @click="addExample">
                <v-icon name="ri-play-list-add-fill" title="Add to wordlist" fill="purple" />
                <span>Add example</span>
              </button>
            </div>
          </div>

          <div v-else class="form-field">
            <label :for="key" class="word-form__label">{{ key }}: </label>
            <textarea
              v-model="updatedWord[key]"
              rows="5"
              :name="key"
              :id="key"
              :required="key === 'word'"
            />
          </div>
        </template>
      </form>
    </template>

    <template #confirm-text>Save</template>
  </AppModal>
</template>

<script setup>
import AppSelect from './reusable/AppSelect.vue'
import AppModal from './reusable/AppModal.vue'
import { computed, ref, watch } from 'vue'
import { useWordStore } from '../stores/word.js'
import { useCategoryStore } from '../stores/category.js'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  word: Object
})
const emit = defineEmits(['closeModal'])

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const FORM_CONFIG = [
    'category',
    'word',
    'transcription',
    'definition',
    'translation',
    'examples'
  ]

const updatedWord = ref(null)
watch(() => props.word, async () => {
  updatedWord.value = cloneDeep(props.word)
}, {
  immediate: true,
  deep: true
})

const example = ref('')
const addExample = () => {
  if (!example.value) return
  updatedWord.value.examples.unshift(example.value)
  example.value = ''
}
const deleteExample = (indexToRemove) => {
  updatedWord.value.examples.splice(indexToRemove, 1)
}
const hasExamples = computed(() => {
  return updatedWord.value.examples.length
})

const save = async () => {
  if (!updatedWord.value?.word) return

  await updatedWord.value.id
    ? wordStore.updateWord(updatedWord.value)
    : wordStore.createWord(updatedWord.value)

  emit('close-modal')
}
</script>

<style scoped>
.word-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.word-form__label {
  font-weight: bold;
}

.word-name {
  font-style: italic;
  font-weight: normal;
}

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
