export const filterBySearchString = (list, prop, searchString) => {
  return (list || []).filter(item => item[prop].toLowerCase().includes(searchString.toLowerCase()))
}
