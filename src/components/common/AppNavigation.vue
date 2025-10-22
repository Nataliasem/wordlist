<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  id: number | string | null
  name: string
}

interface Props {
  items: Item[]
  selectedItemId: number | string | null
}
const props = defineProps<Props>()

defineEmits<{
  click: [item: Item]
  enter: [item: Item]
}>()

// Use function template refs because of re-rendering items when props changes
const itemRefs = ref<Record<string, HTMLElement>>({})
const setRefs = (elementId: number | string | null, element: HTMLElement): void => {
  const key = String(elementId)
  itemRefs.value[key] = element
}
const navigateUp = async (currentIndex: number) => {
  const prevElId = String(props.items[currentIndex - 1]?.id)
  itemRefs.value[prevElId]?.focus()
}
const navigateDown = async (currentIndex: number) => {
  const nextElId = String(props.items[currentIndex + 1]?.id)
  itemRefs.value[nextElId]?.focus()
}
</script>

<template>
  <ul>
    <li
      v-for="(item, index) in items"
      :ref="(el: HTMLElement) => setRefs(item.id, el)"
      :key="String(item.id)"
      :tabindex="index"
      class="outline-none"
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
