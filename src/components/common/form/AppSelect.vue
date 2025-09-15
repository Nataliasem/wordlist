<template>
  <div class="app-form__field">
    <label
      v-if="label"
      :for="id"
      class="form-field__label"
    >
      {{ label }}:
    </label>
    <select
      :id="id"
      v-model="model"
      :name="name"
      class="app-select"
    >
      <option
        v-for="item in options"
        :key="item[valueProp]"
        :value="item[valueProp]"
        :selected="item[valueProp] === model"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
const model = defineModel(
  {
    type: [String, Number, null],
    required: true
  }
)

defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  valueProp: {
    type: String,
    default: 'id'
  },
  nameProp: {
    type: String,
    default: 'name'
  },
  label: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.app-select {
  min-height: 32px;
}
</style>
