'use client'

import { useState, useEffect } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface MobileTableOfContentsProps {
  content: string
  onNavigate?: () => void
}

export default function MobileTableOfContents({ content, onNavigate }: MobileTableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Parse content to extract headings
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    
    const headings = tempDiv.querySelectorAll('h2, h3, h4')
    const items: TocItem[] = []
    
    headings.forEach((heading) => {
      const id = heading.id
      const text = heading.textContent || ''
      const level = parseInt(heading.tagName.substring(1))
      
      if (id && text) {
        items.push({ id, text, level })
      }
    })
    
    setTocItems(items)
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(item => item.element)

      const scrollPosition = window.scrollY + 100

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        if (heading.element && heading.element.offsetTop <= scrollPosition) {
          setActiveId(heading.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (onNavigate) {
        onNavigate()
      }
    }
  }

  if (tocItems.length === 0) {
    return (
      <div className="mobile-toc-empty">
        <p>No headings found on this page</p>
      </div>
    )
  }

  return (
    <div className="mobile-toc">
      <div className="mobile-toc-header">
        <h3 className="mobile-toc-title">On This Page</h3>
      </div>
      <ul className="mobile-toc-list">
        {tocItems.map((item) => (
          <li
            key={item.id}
            className={`mobile-toc-item mobile-toc-level-${item.level} ${
              activeId === item.id ? 'active' : ''
            }`}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="mobile-toc-link"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}