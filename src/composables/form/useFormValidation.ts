import { computed, ref } from 'vue'
import type { Ref } from 'vue'

interface FormField {
    validate: () => void
    hasError: boolean
}

export function useFormValidation(inputRefs: Ref<Record<string, FormField>>) {
  const inputErrors: Ref<string[]> = ref([])
  const hasFormError = computed(() => inputErrors.value.length > 0)

  const validateForm = () => {
    inputErrors.value = []
    for (const key in inputRefs.value) {
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
