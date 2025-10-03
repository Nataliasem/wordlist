import { Category, CategoryKeys } from '@/types'

export const filterBySearchString = <T extends Category>(
    list: T[],
    prop: CategoryKeys,
    searchString: string
): T[] => {
    return list.filter(item => item[prop].toLowerCase().includes(searchString.toLowerCase()));
}
