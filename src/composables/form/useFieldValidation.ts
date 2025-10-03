import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { Ref } from 'vue'

export function useFieldValidation(target: HTMLInputElement, model: Ref<string>, required: Ref<boolean>) {
    const hasError: Ref<boolean> = ref(false)
    const validate = (): void => {
        hasError.value = required && !model.value.length
    }
    const clearError = (): void => {
        hasError.value = false
    }

    onClickOutside(target, () => {
        clearError()
    })

    watch(() => model.value, (newValue, oldValue) => {
        if(!oldValue.length && newValue.length) {
            clearError()
        }
    })

    return {
        hasError,
        validate
    }
}
