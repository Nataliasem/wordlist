type RawObject = Record<string, unknown>
export const normalizeNullable = (obj: RawObject, exceptionFields: string[]) => {
    for (const key in obj) {
        if (exceptionFields.includes(key)) {
            continue
        }

        if (typeof obj[key] === 'undefined' || obj[key] === null) {
            obj[key] = ''
        }
    }

    return obj
}
