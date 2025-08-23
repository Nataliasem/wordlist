<template>
  <tr>
    <th scope="row"><p>{{ word.word }}</p></th>
    <td><p>{{ word.transcription }}</p></td>
    <td><p>{{ word.definition }}</p></td>
    <td><p>{{ word.translation }}</p></td>
    <td><p>{{ word.category?.name || 'No category' }}</p></td>

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
    @cancel="closeModal"
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
            <input
              v-model="updatedWord[key]"
              type="text"
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
import { ref, watch } from 'vue'
import { useWordStore } from '../stores/word.js'
import { useCategoryStore } from '../stores/category.js'
import { useModal } from '../composables/useModal.js'

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
    ...props.word,
    category: props.word?.category?.id || null
  }
}, {
  immediate: true,
  deep: true
})

const save = async () => {
  if (!updatedWord.value.word) return
  await wordStore.updateWord(updatedWord.value)
  closeModal()
}
</script>

<style scoped>
tr {
  transition: background-color 0.3s ease;
}

tr:hover {
  background-color: lavenderblush;
}

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
</style>
