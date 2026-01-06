import { mount, config } from '@vue/test-utils'
import CategoryItems from './CategoryItems.vue'
import { WITHOUT_CATEGORY_NAME } from '@/constants'

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

describe('CategoryItems.vue', () => {
  it('renders categories list', async () => {
    const wrapper = mount(CategoryItems, {
      props: {
        categories: testCategories
      }
    })
    const renderedCategories = wrapper.findAll('[data-test-id="category-name"]')
    expect(renderedCategories).length(9)
    expect(renderedCategories.map(item => item.text())).toEqual(['Animals', 'Food', 'Emotions', 'Flowers', 'Countries', 'Cities', 'Careers', 'Cars', 'Toys'])
  })

  it('should render action buttons if category id is not null', async () => {
    const wrapper = mount(CategoryItems, {
      props: {
        categories: [
          { id: null, name: WITHOUT_CATEGORY_NAME },
          { id: 1, name: 'Animals' },
        ]
      }
    })
    const actions = wrapper.findAll('[data-test-id="category-actions"]')
    expect(actions).length(1)

    wrapper.get('[data-test-id="toggle-updating-mode-button"]')
    wrapper.get('[data-test-id="open-modal-button"]')
  })

  it('should not render action buttons if category id is null', async () => {
    const wrapper = mount(CategoryItems, {
      props: {
        categories: [
          { id: null, name: WITHOUT_CATEGORY_NAME }
        ]
      }
    })
    const actions = wrapper.findAll('[data-test-id="category-actions"]')
    expect(actions).length(0)

    expect(() => wrapper.get('[data-test-id="toggle-updating-mode-button"]')).toThrowError()
    expect(() => wrapper.get('[data-test-id="open-modal-button"]')).toThrowError()
  })
})