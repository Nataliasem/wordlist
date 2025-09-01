import { computed, ref } from 'vue'

export function useFormValidation(inputRefs) {
  const inputErrors = ref([])
  const hasFormError = computed(() => inputErrors.value.length > 0)

  const validateForm = () => {
    inputErrors.value = []
    for (let key in inputRefs.value) {
      inputRefs.value[key].validate()
      if(inputRefs.value[key].hasError) {
        inputErrors.value.push(key)
      }
    }
  }

  return {
    hasFormError,
    validateForm
  }
}
