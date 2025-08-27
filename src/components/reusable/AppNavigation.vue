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
      <slot :item="item" />
    </li>
  </ul>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  items: Array,
  selectedItemId: { type: [Number, String, null] },
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

watch(() => props.items, async () => {
  await nextTick() // nextTick is required
  itemRefs.value[props.selectedItemId]?.focus()
})
</script>
