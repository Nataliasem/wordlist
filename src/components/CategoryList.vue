<template>
  <div class="category-list">
    <div class="add-category__wrapper">
      <input v-model="category" class="add-category__input" type="text" placeholder="New category">
      <button class="add-category__button" @click="addCategory">Add</button>
    </div>

    <div class="divider" />

    <div class="category-list__wrapper">
      <div
        v-for="item in categories"
        :key="item.id"
        class="category-name"
        :class="{ 'category-name__selected' : selectedCategory?.id === item.id }"
        @click="selectCategory(item)"
      >
        <div>
          {{ item.name }}
        </div>
        <div
          class="category-actions"
          :class="{ 'category-actions__selected' : selectedCategory?.id === item.id }"
        >
          <div class="category-actions__button">✎</div>
          <div class="category-actions__button" @click="deleteCategory(item.id)">
            ❌
          </div>
        </div>
      </div>
    </div>

    <div class="divider" />
    <div class="category-name" @click="selectCategory(null)">no category</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['selectCategory'])

const selectedCategory = ref(null)
const selectCategory = (category) => {
  selectedCategory.value = category
  emit('selectCategory', category)
}

const categories = ref([])
const getCategories = async () => {
  const response = await fetch('http://192.168.1.67:8080/api/v1/categories')
  if (response.ok) {
    categories.value = await response.json()
  } else {
    alert('Ошибка HTTP: ' + response.status)
  }
}
const category = ref('')
const addCategory = async () => {
  if(category.value === '') {
    return
  }

  const response = await fetch('http://192.168.1.67:8080/api/v1/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category: category.value })
  })

  if (response.ok) {
    await getCategories()
    category.value = ''
  } else {
    alert('Ошибка HTTP: ' + response.status)
  }
}
const deleteCategory = async (id) => {
  const response = await fetch(`http://192.168.1.67:8080/api/v1/categories/${ id }`, {
    method: 'DELETE'
  })

  if (response.ok) {
    await getCategories()
    selectedCategory.value = null
  } else {
    alert('Ошибка HTTP: ' + response.status)
  }
}

onMounted(() => {
  getCategories()
})
</script>

<style scoped>
.category-list {
  position: fixed;
  top: 0;
  height: 100%;
  background-color: #f1f0f2;
  padding: 16px;
  -webkit-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
}

.category-list__wrapper {
  overflow-y: scroll;
  height: 75%;
}

.category-name {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  font-weight: bold;
}

.category-name:hover {
  background-color: #e7e6e9;
}

.category-name__selected {
  background-color: lavender;
  border-radius: 4px;
  border: 2px solid purple;
}

.add-category__wrapper {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.add-category__input {
  flex-grow: 1;
  border: 2px solid #e7e6e9;
  border-radius: 4px;
  font-size: 1em;
}

.add-category__button {
  margin-left: 8px;
  border-radius: 4px;
  border: 2px solid #e7e6e9;
}

.category-actions {
  display: none;
  cursor: pointer;
}

.category-actions__selected {
  display: flex;
}

.category-actions__button {
  padding: 0 8px;
}

.category-actions__button:first-child {
  margin-right: 4px;
}

.divider {
  height: 2px;
  width: 100%;
  background-color: #e7e6e9;
  margin: 8px 0;
  border-radius: 1px;
}
</style>
