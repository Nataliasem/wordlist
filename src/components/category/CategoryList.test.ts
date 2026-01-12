import CategoryList from './CategoryList.vue'
import { shallowMount } from '@vue/test-utils'
import { useCategoryFetch, UseCategoryFetchReturn } from '@/composables'
import { FETCH_CATEGORY_MESSAGE, MessageType } from '@/constants'
import { computed } from 'vue'

vi.mock('@/composables', () => ({
  useCategoryFetch: vi.fn()
}))

const mountComponent = (fetchMessage: { type: MessageType, text: string } | null) => {
  vi.mocked(useCategoryFetch).mockReturnValue({
    fetchMessage: computed(() => fetchMessage),
  } as unknown as UseCategoryFetchReturn)

  return shallowMount(CategoryList)
}

describe('CategoryList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('does not display Error message if there is no error', () => {
    const wrapper = mountComponent(null)
    const fetchMessageText = wrapper.find('[data-test-id="fetch-message-text"]')
    expect(fetchMessageText.exists()).toBe(false)
  })

  it('does not display Reload page button if there is no error', () => {
    const wrapper = mountComponent(null)
    const reloadPageLink = wrapper.find('[data-test-id="reload-page-link"]')
    expect(reloadPageLink.exists()).toBe(false)
  })

  it('displays Error message when exists', () => {
    const wrapper = mountComponent(FETCH_CATEGORY_MESSAGE.error)
    const fetchMessageText = wrapper.find('[data-test-id="fetch-message-text"]')
    expect(fetchMessageText.exists()).toBe(true)
    expect(fetchMessageText.text()).toBe(FETCH_CATEGORY_MESSAGE.error.text)
  })

  it('displays reload page link when Error message exists', () => {
    const wrapper = mountComponent(FETCH_CATEGORY_MESSAGE.error)
    const reloadPageLink = wrapper.find('[data-test-id="reload-page-link"]')
    expect(reloadPageLink.exists()).toBe(true)
  })

  it('displays Empty message when exists', () => {
    const wrapper = mountComponent(FETCH_CATEGORY_MESSAGE.empty)
    const fetchMessageText = wrapper.find('[data-test-id="fetch-message-text"]')
    expect(fetchMessageText.exists()).toBe(true)
    expect(fetchMessageText.text()).toBe(FETCH_CATEGORY_MESSAGE.empty.text)
  })

  it('does not display Reload page button when Empty message exists', () => {
    const wrapper = mountComponent(FETCH_CATEGORY_MESSAGE.empty)
    const reloadPageLink = wrapper.find('[data-test-id="reload-page-link"]')
    expect(reloadPageLink.exists()).toBe(false)
  })

  it('displays EmptySearch message when exists', () => {
    const wrapper = mountComponent(FETCH_CATEGORY_MESSAGE.emptySearch)
    const fetchMessageText = wrapper.find('[data-test-id="fetch-message-text"]')
    expect(fetchMessageText.exists()).toBe(true)
    expect(fetchMessageText.text()).toBe(FETCH_CATEGORY_MESSAGE.emptySearch.text)
  })

  it('does not display Reload page button when EmptySearch message exists', () => {
    const wrapper = mountComponent(FETCH_CATEGORY_MESSAGE.emptySearch)
    const reloadPageLink = wrapper.find('[data-test-id="reload-page-link"]')
    expect(reloadPageLink.exists()).toBe(false)
  })
})
