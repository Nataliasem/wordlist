<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-mask">
      <div class="modal-body">
        <h2>Edit the word <span class="word-name">{{ updatedWord.word }}</span></h2>
        <form @submit.prevent="save" class="word-form">
          <template v-for="(_, key) in updatedWord">
            <div v-if="key === 'category'" class="form-field">
              <label :for="key" class="word-form__label">{{ key }}: </label>
              <select v-model="updatedWord.category" :name="key">
                <option
                  v-for="item in categoryStore.categories"
                  :key="item.id"
                  :value="item.id"
                  :selected="updatedWord.category === item.id"
                >
                  {{ item.name }}
                </option>
              </select>
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

          <div class="form-actions">
            <button type="submit" class="word-form__button">Save</button>
            <button
              type="button"
              class="word-form__button word-form__button-cancel"
              @click="$emit('close')"
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
import { useCategoryStore } from '../stores/category.js'
import { useWordStore } from '../stores/word.js'

const props = defineProps({
  isOpen: Boolean,
  word: Object
})
const emit = defineEmits(['close'])

const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const updatedWord = ref(null)
watch(() => props.isOpen, async () => {
  updatedWord.value = {
    ...props.word,
    category: props.word?.category?.id || null
  }
})

const save = async () => {
  if (!updatedWord.value.word) return
  await updateWord(updatedWord.value)
  await wordStore.fetchWords()
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

/* Special styles for Transition component */
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
