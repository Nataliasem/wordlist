<template>
  <ul>
    <li
      v-for="(item, index) in items"
      :key="item.id"
      ref="items"
      :tabindex="index"
      @click="$emit('click', item)"
      @focus="$emit('click', item)"
      @keyup.enter="$emit('enter', item)"
      @keyup.up="navigateUp(index)"
      @keyup.down="navigateDown(index)"
    >
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, useTemplateRef } from 'vue'

const props = defineProps({
  items: Array
})

defineEmits(['click', 'enter'])

const itemRefs = useTemplateRef('items')
const navigateUp = async (currentIndex) => {
  const prevElId = props.items[currentIndex - 1]?.id
  const prevElIndex = props.items.findIndex((item) => item.id === prevElId)
  itemRefs.value[prevElIndex]?.focus()
}
const navigateDown = async (currentIndex) => {
  const nextElId = props.items[currentIndex + 1]?.id
  const nextElIndex = props.items.findIndex((item) => item.id === nextElId)
  itemRefs.value[nextElIndex]?.focus()
}

onMounted(() => {
  itemRefs.value[0]?.focus()
})

</script>

<style scoped>

</style>
