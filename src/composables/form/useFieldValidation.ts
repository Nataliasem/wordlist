import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { Ref, ShallowRef } from 'vue'


export function useFieldValidation(target: Readonly<ShallowRef<HTMLInputElement | null>>, model: Ref<string | undefined>, required: boolean) {
    const hasError: Ref<boolean> = ref(false)
    const validate = (): void => {
        hasError.value = required && !model.value?.length
    }
    const clearError = (): void => {
        hasError.value = false
    }

    onClickOutside(target, () => {
        clearError()
    })

    watch(() => model.value, (newValue, oldValue) => {
        if(!oldValue?.length && newValue?.length) {
            clearError()
        }
    })

    return {
        hasError,
        validate
    }
}
