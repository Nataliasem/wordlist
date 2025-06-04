<template>
  <div class="category-list">
    <div class="add-category__wrapper">
      <input v-model="category" class="add-category__input" type="text">
      <button class="add-category__button" @click="addCategory">Add</button>
    </div>

    <div class="divider" />

    <div v-for="item in categories" :key="item.id" class="category-name">
     <div @click="selectCategoryId(item.id)">
       {{ item.name }}
     </div>
      <div class="category-actions">
        <button class="category-actions__button">✏</button>
        <button class="category-actions__button" @click="deleteCategory(item.id)">
          ❌
        </button>
      </div>
    </div>

    <div class="divider" />

    <div class="category-name" @click="selectCategoryId(null)">All words</div>

    <div class="divider" />
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
  background-color: lightseagreen;
  padding: 32px;
  min-width: 300px;
  -webkit-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
}

.category-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  color: #fff;
  font-weight: bold;
}

.add-category__wrapper {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.add-category__input {
  flex-grow: 1;
  border: 1px dashed cadetblue;
  font-size: 1em;
}

.add-category__button {
  margin-left: 8px;
}

.category-actions {
  display: flex;
  cursor: pointer;
}

.category-actions__button {
  padding: 2px 8px;
  background-color: white;
}

.category-actions__button:first-child {
  margin-right: 4px;
}

.divider {
  height: 2px;
  width: 100%;
  background-color: white;
  margin: 8px 0;
  border-radius: 1px;
}
</style>
