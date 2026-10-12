import { useEffect } from 'react'
import { useLocation } from 'react-router'

const siteUrl = 'https://www.everydaytechllc.com'

function usePageMeta(title: string, description: string) {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousTitle = document.title
    const previousDescription = meta?.content

    document.title = title
    if (meta) meta.content = description
    if (canonical) canonical.href = `${siteUrl}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`

    return () => {
      document.title = previousTitle
      if (meta && previousDescription !== undefined) meta.content = previousDescription
    }
  }, [title, description, pathname])
}

export default usePageMeta
