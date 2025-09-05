<template>
  <tr class="add-table-row">
    <template v-for="item in columnConfig">
      <td v-if="item.display">
        <AppTextarea
          v-model="localRowModel[item.key]"
          :id="item.key"
          :ref="(el) => { inputRefs[item.key] = el }"
          :required="item.required"
        />
      </td>
    </template>

    <td class="table-row-action">
      <button class="icon-button_filled" type="button" @click="addWordToCategory">
        <v-icon name="ri-play-list-add-fill" title="Add to wordlist" fill="purple" />
      </button>
    </td>

    <td class="table-row-action">
      <button class="icon-button_filled" type="button" @click="clearUserInput">
        <v-icon name="ri-delete-back-2-line" title="Clear inputs" fill="purple" />
      </button>
    </td>
  </tr>
</template>

<script setup>
import AppTextarea from '../../common/AppTextarea.vue'
import { ref } from 'vue'
import { useFormValidation } from '../../../composables/index.js'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  rowModel: Object,
  columnConfig: Object
})

const emit = defineEmits(['add-row'])

const localRowModel = ref(cloneDeep(props.rowModel))
const clearUserInput = () => {
  localRowModel.value = cloneDeep(props.rowModel)
}

const inputRefs = ref({})
const { validateForm, hasFormError } = useFormValidation(inputRefs)
const addWordToCategory = async () => {
  validateForm()
  if (hasFormError.value) return

  emit('add-row', localRowModel.value)
  clearUserInput()
}
</script>

<style scoped>
.add-table-row {
  background-color: lavender;
  transition: background-color 0.3s ease;
}

.add-table-row:hover {
  background-color: rgba(147, 112, 219, 0.4);
}

.add-table-row:hover .icon-button_filled {
  background-color: white;
}
</style>

