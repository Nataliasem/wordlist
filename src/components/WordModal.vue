<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-mask">
    <div class="modal-body">
      <h2>Edit the word <span class="word-name">{{ updatedWord.word }}</span></h2>
      <form @submit.prevent="save" class="word-form">
        <div class="form-field">
          <label for="word" class="word-form__label">Word: </label>
          <input v-model="updatedWord.word" type="text" name="word" id="word" required />
        </div>
        <div class="form-field">
          <label for="transcription" class="word-form__label">Transcription: </label>
          <input v-model="updatedWord.transcription" type="text" name="transcription" id="transcription" />
        </div>
        <div class="form-field">
          <label for="definition" class="word-form__label">Definition: </label>
          <textarea v-model="updatedWord.definition" name="definition" id="definition" />
        </div>
        <div class="form-field">
          <label for="translation" class="word-form__label">Translation: </label>
          <textarea v-model="updatedWord.translation" name="translation" id="translation" />
        </div>
        <div class="form-field">
          <label for="category" class="word-form__label">Category: </label>
          <select v-model="selectedCategoryId" name="category">
            <option
              v-for="item in categories"
              :key="item.id"
              :value="item.id"
              :selected="selectedCategoryId === item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="form-actions">
          <button type="submit" class="word-form__button">Save</button>
          <button
            type="button"
            class="word-form__button word-form__button-cancel"
            @click="closeModal"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { updateWord } from '../api/word.js'

const props = defineProps({
  selectedCategory: Object,
  isOpen: Boolean,
  word: Object,
  categories: Array
})

const emit = defineEmits([ 'close', 'update-words' ])

const updatedWord = ref(null)
watch(() => props.isOpen, async () => {
  updatedWord.value = {...props.word}
  selectedCategoryId.value = props.selectedCategory?.id || null
})

const selectedCategoryId = ref(updatedWord.value?.category?.id)
const save = async () => {
  if(!updatedWord.value.word) return

  const payload = {
    ...updatedWord.value,
    category: selectedCategoryId.value
  }
  await updateWord(payload)
  emit('update-words')
  emit('close')
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-mask {
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px;
  transition: opacity 0.3s ease;
}

.modal-body {
  background-color: white;
  min-height: 450px;
  min-width: 500px;
  border-radius: 4px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.word-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.word-form__label {
  font-weight: bold;
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: end;
}

.word-form__button {
  font-weight: bold;
  background-color: lavender;
  padding: 8px;
}

.word-form__button-cancel {
  background-color: salmon;
}

.word-name {
  font-style: italic;
  font-weight: normal;
}
</style>
