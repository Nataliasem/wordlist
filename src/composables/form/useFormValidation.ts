import { computed, ref } from 'vue'

export function useFormValidation(inputRefs) {
  const inputErrors = ref([])
  const hasFormError = computed(() => inputErrors.value.length > 0)

  const validateForm = () => {
    inputErrors.value = []
    for (const inputEl of inputRefs.value) {
        inputEl.validate()
      if(inputEl.hasError) {
        inputErrors.value.push(inputEl)
      }
    }
  }

  return {
    hasFormError,
    validateForm
  }
}
