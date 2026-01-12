import { mount, config } from '@vue/test-utils'
import App from './App.vue'
import CategoryList from './components/category/CategoryList.vue'
import WordList from './components/word/WordList.vue'

config.global.stubs['v-icon'] = {
  template: '<div class="stubbed-v-icon" />'
}

describe('App.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(App)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('aside').exists()).toBe(true)
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('main').exists()).toBe(true)
  })

  it('renders CategoryList component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent(CategoryList).exists()).toBe(true)
  })

  it('renders WordList component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent(WordList).exists()).toBe(true)
  })

  it('displays the correct application title', () => {
    const wrapper = mount(App)
    const title = wrapper.find('h1')

    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Wordlist')
    expect(title.classes()).toContain('text-2xl')
    expect(title.classes()).toContain('text-purple-900')
  })

  it('renders navigation bar with correct styling', () => {
    const wrapper = mount(App)
    const nav = wrapper.find('nav')

    expect(nav.exists()).toBe(true)
    expect(nav.classes()).toContain('h-16')
    expect(nav.classes()).toContain('border-b')
    expect(nav.classes()).toContain('border-gray-200')
    expect(nav.classes()).toContain('px-4')
    expect(nav.classes()).toContain('flex')
    expect(nav.classes()).toContain('items-center')
    expect(nav.classes()).toContain('justify-end')
  })

  it('renders components properly when menu is expanded', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent(CategoryList).exists()).toBe(true)
    expect(wrapper.findComponent(WordList).exists()).toBe(true)

    const contentContainer = wrapper.find('[data-test-id="content-wrapper"]')
    expect(contentContainer.classes()).toContain('lg:w-(--content-sidebar-expanded)')
    expect(contentContainer.classes()).toContain('lg:ml-(--sidebar-expanded)')
  })

  it('renders components properly when menu is compressed', async () => {
    const wrapper = mount(App)

    await wrapper.find('[data-test-id="expand-menu-button"]').trigger('click')

    expect(wrapper.findComponent(CategoryList).exists()).toBe(false)
    expect(wrapper.findComponent(WordList).exists()).toBe(true)

    const contentContainer = wrapper.find('[data-test-id="content-wrapper"]')
    expect(contentContainer.classes()).not.toContain('lg:w-(--content-sidebar-expanded)')
    expect(contentContainer.classes()).not.toContain('lg:ml-(--sidebar-expanded)')
    expect(contentContainer.classes()).toContain('w-(--content-sidebar-compressed)')
    expect(contentContainer.classes()).toContain('ml-(--sidebar-compressed)')
  })

  it('applies correct classes to main content container', () => {
    const wrapper = mount(App)
    const contentContainer = wrapper.find('[data-test-id="content-wrapper"]')

    expect(contentContainer.classes()).toContain('fixed')
    expect(contentContainer.classes()).toContain('top-0')
    expect(contentContainer.classes()).toContain('w-(--content-sidebar-compressed)')
    expect(contentContainer.classes()).toContain('ml-(--sidebar-compressed)')
    expect(contentContainer.classes()).toContain('transition-[margin]')
    expect(contentContainer.classes()).toContain('duration-200')
  })

  it('renders sidebar as fixed with correct z-index', () => {
    const wrapper = mount(App)
    const aside = wrapper.find('aside')

    expect(aside.exists()).toBe(true)
    expect(aside.classes()).toContain('fixed')
    expect(aside.classes()).toContain('h-full')
    expect(aside.classes()).toContain('z-1000')
  })

  it('maintains proper layout structure', () => {
    const wrapper = mount(App)

    const aside = wrapper.find('aside')
    const mainContainer = wrapper.find('div > div')

    expect(aside.exists()).toBe(true)
    expect(mainContainer.exists()).toBe(true)

    const nav = mainContainer.find('nav')
    const main = mainContainer.find('main')

    expect(nav.exists()).toBe(true)
    expect(main.exists()).toBe(true)
  })
})