export const normalizeNullable = (obj, exceptionFields) => {
  for (let key in obj) {
    if(!exceptionFields.includes(key) && (typeof obj[key] === 'undefined' || obj[key] === null)) {
      obj[key] = ''
    }
  }

  return obj
}

