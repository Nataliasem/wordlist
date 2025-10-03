export const filterBySearchString = <T extends Record<string, string>>(
    list: T[],
    prop: keyof T,
    searchString: string
): T[] => {
    return list.filter(item => item[prop].toLowerCase().includes(searchString.toLowerCase()));
}
