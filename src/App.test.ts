import { mount } from '@vue/test-utils'
import App from './App.vue'
import CategoryList from './components/category/CategoryList.vue'
import WordList from './components/word/WordList.vue'
import { useExpanded } from './composables'
import { ref } from "vue";

vi.mock('./components/category/CategoryList.vue', () => ({
    default: {
        name: 'CategoryList',
        template: '<div data-test-id="category-list">Category List</div>'
    }
}))

vi.mock('./components/word/WordList.vue', () => ({
    default: {
        name: 'WordList',
        template: '<div data-test-id="word-list">Word List</div>'
    }
}))

vi.mock('@/composables', () => ({
    useExpanded: vi.fn()
}))

describe('App.vue', () => {
    const isExpandedDefault = ref(true)
    const mountComponent = (isExpanded = isExpandedDefault) => {
        vi.mocked(useExpanded).mockReturnValue({
            isExpanded: isExpanded
        })


        return mount(App, {
            global: {
                stubs: {
                    CategoryList: true,
                    WordList: true
                }
            }
        })
    }

    it('renders the component', () => {
        const wrapper = mountComponent()

        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('aside').exists()).toBe(true)
        expect(wrapper.find('nav').exists()).toBe(true)
        expect(wrapper.find('main').exists()).toBe(true)
    })

    it('renders CategoryList component', () => {
        const wrapper = mountComponent()
        const categoryList = wrapper.findComponent(CategoryList)

        expect(categoryList.exists()).toBe(true)
        expect(wrapper.find('[data-test-id="category-list"]').exists()).toBe(true)
    })

    it('renders WordList component', () => {
        const wrapper = mountComponent()
        const wordList = wrapper.findComponent(WordList)

        expect(wordList.exists()).toBe(true)
        expect(wrapper.find('[data-test-id="word-list"]').exists()).toBe(true)
    })

    it('displays the correct application title', () => {
        const wrapper = mountComponent()
        const title = wrapper.find('h1')

        expect(title.exists()).toBe(true)
        expect(title.text()).toBe('Wordlist')
        expect(title.classes()).toContain('text-2xl')
        expect(title.classes()).toContain('text-purple-900')
    })

    it('renders navigation bar with correct styling', () => {
        const wrapper = mountComponent()
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

    it('applies correct classes to main content container', () => {
        const wrapper = mountComponent()
        const contentContainer = wrapper.find('[data-test-id="content-wrapper"]')

        expect(contentContainer.classes()).toContain('fixed')
        expect(contentContainer.classes()).toContain('top-0')
        expect(contentContainer.classes()).toContain('w-(--content-sidebar-compressed)')
        expect(contentContainer.classes()).toContain('ml-(--sidebar-compressed)')
        expect(contentContainer.classes()).toContain('transition-[margin]')
        expect(contentContainer.classes()).toContain('duration-200')
    })

    it('applies expanded classes when isExpanded is true', () => {
        const wrapper = mountComponent(true)
        const contentContainer = wrapper.find('[data-test-id="content-wrapper"]')

        expect(contentContainer.classes()).toContain('lg:w-(--content-sidebar-expanded)')
        expect(contentContainer.classes()).toContain('lg:ml-(--sidebar-expanded)')
    })

    it('does not apply expanded classes when isExpanded is false', () => {
        const isExpanded = ref(false)
        const wrapper = mountComponent(isExpanded)
        const contentContainer = wrapper.find('[data-test-id="content-wrapper"]')

        expect(contentContainer.classes()).not.toContain('lg:w-(--content-sidebar-expanded)')
        expect(contentContainer.classes()).not.toContain('lg:ml-(--sidebar-expanded)')
        expect(contentContainer.classes()).toContain('w-(--content-sidebar-compressed)')
        expect(contentContainer.classes()).toContain('ml-(--sidebar-compressed)')
    })

    it('renders sidebar as fixed with correct z-index', () => {
        const wrapper = mountComponent()
        const aside = wrapper.find('aside')

        expect(aside.exists()).toBe(true)
        expect(aside.classes()).toContain('fixed')
        expect(aside.classes()).toContain('h-full')
        expect(aside.classes()).toContain('z-1000')
    })

    it('passes correct props to child components', () => {
        const wrapper = mountComponent()

        expect(wrapper.findComponent(CategoryList).exists()).toBe(true)
        expect(wrapper.findComponent(WordList).exists()).toBe(true)
    })

    it('maintains proper layout structure', () => {
        const wrapper = mountComponent()

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