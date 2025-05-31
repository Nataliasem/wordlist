<template>
  <div class="category-list">
    <input v-model="category" type="text">
    <button @click="addCategory">Add category</button>

    <div v-for="item in categories" :key="item.id">
     <div class="category-name" @click="selectCategoryId(item.id)">{{ item.name }}</div>
      <button
        class="delete-category-button"
        @click="deleteCategory(item.id)"
      >
        ❌
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['selectCategoryId'])
const selectCategoryId = (id) => {
  emit('selectCategoryId', id)
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
  background-color: darkgray;
  padding: 32px;
  flex-shrink: 0;
}

.delete-category-button {
  display: none;
  cursor: pointer;
}

.category-name {
  padding: 8px 16px;
  cursor: pointer;
}

.category-name:hover .delete-category-button {
  display: none;
}
</style>
