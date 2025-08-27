<template>
  <ul>
    <li
      v-for="(item, index) in items"
      :ref="(el) => { itemRefs[item.id] = el }"
      :key="item.id"
      ref="items"
      :tabindex="index"
      @click="$emit('click', item)"
      @focus="$emit('click', item)"
      @keyup.enter="$emit('enter', item)"
      @keyup.up="navigateUp(index)"
      @keyup.down="navigateDown(index)"
    >
      <slot :item="item" :itemRef="itemRefs[item.id]" />
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  items: Array
})
defineEmits(['click', 'enter'])

const itemRefs = ref({})
const navigateUp = async (currentIndex) => {
  const prevElId = props.items[currentIndex - 1]?.id
  itemRefs.value[prevElId]?.focus()
}
const navigateDown = async (currentIndex) => {
  const nextElId = props.items[currentIndex + 1]?.id
  itemRefs.value[nextElId]?.focus()
}

onMounted(() => {
  const firstElId = props.items[0]?.id
  itemRefs.value[firstElId]?.focus()
})
</script>
