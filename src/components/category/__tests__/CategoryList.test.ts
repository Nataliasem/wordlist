import CategoryList from '../CategoryList.vue'
import { flushPromises, mount, shallowMount, config } from '@vue/test-utils';
import { useCategoryFetch, UseCategoryFetchReturn } from '@/composables'
import { FETCH_CATEGORY_MESSAGE, MessageType, WITHOUT_CATEGORY_NAME } from '@/constants';
import { computed } from 'vue'
import AppModal from '@/components/common/AppModal.vue';


config.global.stubs['v-icon'] = {
  template: '<div class="stubbed-v-icon" />'
};

const testCategories = [
  { id: 1, name: 'Animals' },
  { id: 2, name: 'Food' },
  { id: 3, name: 'Emotions' },
  { id: 4, name: 'Flowers' },
  { id: 5, name: 'Countries' },
  { id: 6, name: 'Cities' },
  { id: 7, name: 'Careers' },
  { id: 8, name: 'Cars' },
  { id: 9, name: 'Toys' },
]

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

  it('renders categories list', async () => {
    const wrapper = mount(CategoryList, {
      props: {
        categories: testCategories
      }
    })
    const renderedCategories = wrapper.findAll('[data-test-id="category-name"]')
    expect(renderedCategories).length(9)
    expect(renderedCategories.map(item => item.text())).toEqual(['Animals', 'Food', 'Emotions', 'Flowers', 'Countries', 'Cities', 'Careers', 'Cars', 'Toys'])
  })

  it('should render action buttons if category id is not null', async () => {
    const wrapper = mount(CategoryList, {
      props: {
        categories: [
          { id: null, name: WITHOUT_CATEGORY_NAME },
          { id: 1, name: 'Animals' },
        ]
      }
    })
    const actions = wrapper.findAll('[data-test-id="category-actions"]')
    expect(actions).length(1)

    expect(wrapper.find('[data-test-id="toggle-updating-mode-button"]').exists()).toBe(true)
    expect(wrapper.find('[data-test-id="open-confirm-deleting-modal-button"]').exists()).toBe(true)
  })

  it('should not render action buttons if category id is null', async () => {
    const wrapper = mount(CategoryList, {
      props: {
        categories: [
          { id: null, name: WITHOUT_CATEGORY_NAME }
        ]
      }
    })
    const actions = wrapper.findAll('[data-test-id="category-actions"]')
    expect(actions).length(0)

    expect(() => wrapper.get('[data-test-id="toggle-updating-mode-button"]')).toThrowError()
    expect(() => wrapper.get('[data-test-id="open-confirm-deleting-modal-button"]')).toThrowError()
  })

  it('opens modal to confirm deleting category', async () => {
    const wrapper = mount(CategoryList, {
      props: {
        categories: testCategories,
      }
    });

    await wrapper.get('[data-test-id="open-confirm-deleting-modal-button"]').trigger('click');
    await flushPromises();
    expect(wrapper.findComponent(AppModal).exists()).toBe(true);
  })
})
