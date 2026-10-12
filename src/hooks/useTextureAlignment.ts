import { useLayoutEffect } from 'react'

// Elements whose circuit texture should line up with the rest of the page.
const TEXTURED = '.hero, .home_content__section, .home_content__cta, .services-local, .pricing-plans'

// Exposes each textured element's page offset as --texture-y so the CSS can position its
// texture in page coordinates, keeping the pattern continuous across section boundaries.
export function useTextureAlignment(pathname: string) {
  useLayoutEffect(() => {
    const align = () => {
      for (const el of document.querySelectorAll<HTMLElement>(TEXTURED)) {
        el.style.setProperty('--texture-y', `${el.getBoundingClientRect().top + window.scrollY}px`)
      }
    }

    align()
    const observer = new ResizeObserver(align)
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [pathname])
}
