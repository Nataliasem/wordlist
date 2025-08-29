<template>
  <tr>
    <th scope="row"><p>{{ word.word }}</p></th>
    <td><p>{{ word.transcription }}</p></td>
    <td><p>{{ word.definition }}</p></td>
    <td><p>{{ word.translation }}</p></td>

    <td class="td-action">
      <button class="icon-button_filled" @click="openModal">
        <v-icon name="ri-pencil-line" title="Edit word" />
      </button>
    </td>
    <td class="td-action">
      <button class="icon-button_filled" @click="deleteWordFromCategory">
        <v-icon name="ri-delete-bin-2-line" title="Delete from category" />
      </button>
    </td>
  </tr>

  <AppModal
    v-if="isModalOpen"
    @confirm="save"
    @cancel="cancel"
  >
    <template #header>
      Edit the word <span class="word-name">{{ word.word }}</span>
    </template>

    <template #content>
      <form @submit.prevent class="word-form">
        <template v-for="(_, key) in updatedWord">
          <div v-if="key === 'category'" class="form-field">
            <label :for="key" class="word-form__label">{{ key }}: </label>
            <AppSelect
              v-model="updatedWord.category"
              :select-name="key"
              :options="categoryStore.categories"
            />
          </div>
          <div v-if="!['id', 'examples', 'category'].includes(key)" class="form-field">
            <label :for="key" class="word-form__label">{{ key }}: </label>
            <textarea
              v-model="updatedWord[key]"
              rows="5"
              :name="key"
              :id="key"
              :required="key === 'word'"
            />
          </div>
          <div v-if="['examples'].includes(key)" class="form-field">
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
                :required="key === 'word'"
              />
              <button class="icon-button_filled add-example-button" type="button" @click="addExample">
                <v-icon name="ri-play-list-add-fill" title="Add to wordlist" fill="purple" />
                <span>Add example</span>
              </button>
            </div>
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
import { useModal } from '../composables/useModal.js'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  word: Object
})

const { isModalOpen, closeModal, openModal } = useModal()

const categoryStore = useCategoryStore()
const wordStore = useWordStore()
const deleteWordFromCategory = async () => {
  await wordStore.deleteWord(props.word.id)
}

const updatedWord = ref(null)
watch(() => props.word, async () => {
  updatedWord.value = {
    category: props.word?.category?.id || null,
    ...cloneDeep(props.word)
  }
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
  if (!updatedWord.value.word) return
  await wordStore.updateWord(updatedWord.value)
  closeModal()
}

const cancel = () => {
  updatedWord.value = {
    category: props.word?.category?.id || null,
    ...cloneDeep(props.word)
  }
  closeModal()
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
