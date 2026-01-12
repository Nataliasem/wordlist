import { useExpanded } from './useExpanded'
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'

vi.mock('@vueuse/core', () => ({
  useWindowSize: vi.fn()
}))

describe('useExpanded', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockWindowSize = (width: number, height: number) => {
    const widthRef = ref(width)
    const heightRef = ref(height)
    vi.mocked(useWindowSize).mockReturnValue({ width: widthRef, height: heightRef })
  }

  it('returns isExpanded: true for desktop (large width)', () => {
    mockWindowSize(1280, 800)

    const { isExpanded } = useExpanded()
    expect(isExpanded.value).toBe(true)
  })

  it('returns isExpanded: false for mobile (small width)', () => {
    mockWindowSize(375, 667)

    const { isExpanded } = useExpanded()
    expect(isExpanded.value).toBe(false)
  })

  it('returns isExpanded: false when width is exactly the mobile breakpoint (768px)', () => {
    mockWindowSize(768, 1024) // Common mobile breakpoint

    const { isExpanded } = useExpanded()
    expect(isExpanded.value).toBe(false)
  })

  it('returns isExpanded: false when width is just above mobile breakpoint (769px)', () => {
    mockWindowSize(769, 1024)

    const { isExpanded } = useExpanded()
    expect(isExpanded.value).toBe(false)
  })

  it('returns isExpanded: false for tablet portrait (768x1024)', () => {
    mockWindowSize(768, 1024)

    const { isExpanded } = useExpanded()
    expect(isExpanded.value).toBe(false)
  })

  it('returns isExpanded: true for tablet landscape (1024x768)', () => {
    mockWindowSize(1024, 768)

    const { isExpanded } = useExpanded()
    expect(isExpanded.value).toBe(true)
  })

  it('returns isExpanded: true for large desktop (1920x1080)', () => {
    mockWindowSize(1920, 1080)

    const { isExpanded } = useExpanded()
    expect(isExpanded.value).toBe(true)
  })

  it('returns isExpanded: false for small mobile (320x568)', () => {
    mockWindowSize(320, 568)

    const { isExpanded } = useExpanded()
    expect(isExpanded.value).toBe(false)
  })
})