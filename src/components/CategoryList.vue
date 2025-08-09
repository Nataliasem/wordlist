<template>
  <div class="category-list">
    <div class="add-category__wrapper">
      <input v-model="category" class="add-category__input" type="text" placeholder="New category">
      <button class="add-category__button" @click="addCategory">Add</button>
    </div>

    <div class="divider" />

    <div
      v-for="item in categories"
      :key="item.id"
      class="category-name"
      :class="{ 'category-name__selected' : selectedCategory?.id === item.id }"
    >
     <div @click="selectCategory(item)">
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

    <div class="divider" />

    <div class="category-name" @click="selectCategory(null)">Without category</div>

    <div class="divider" />
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
  height: 100%;
  background-color: lightseagreen;
  padding: 16px;
  -webkit-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
}

.category-name {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  color: #fff;
  font-weight: bold;
}

.category-name__selected {
  color: palevioletred;
  background-color: white;
  border-radius: 4px;
}

.add-category__wrapper {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.add-category__input {
  flex-grow: 1;
  border: 1px dashed palevioletred;
  font-size: 1em;
}

.add-category__button {
  margin-left: 8px;
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
