'use client'

import { useState, useEffect } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings from HTML content
  useEffect(() => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    
    const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4')
    const items: TOCItem[] = []
    
    headingElements.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1))
      // Skip h1 as it's usually the page title
      if (level > 1) {
        items.push({
          id: heading.id || '',
          text: heading.textContent || '',
          level
        })
      }
    })
    
    setHeadings(items)
  }, [content])

  // Track active heading based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.querySelector('.main-content') as HTMLElement
      const scrollPosition = mainContent ? mainContent.scrollTop + 100 : window.scrollY + 100
      
      // If near top, set active to "top"
      if (scrollPosition < 200) {
        setActiveId('top')
        return
      }
      
      let currentActiveId = ''
      for (const heading of headings) {
        const element = document.getElementById(heading.id)
        if (element) {
          const elementTop = mainContent ? 
            element.offsetTop - mainContent.offsetTop : 
            element.offsetTop
          
          if (elementTop <= scrollPosition) {
            currentActiveId = heading.id
          }
        }
      }
      
      setActiveId(currentActiveId)
    }

    const mainContent = document.querySelector('.main-content') as HTMLElement
    const scrollContainer = mainContent || window

    scrollContainer.addEventListener('scroll', handleScroll)
    handleScroll() // Set initial active heading
    
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    
    // Find the scrollable container
    const mainContent = document.querySelector('.main-content') as HTMLElement
    
    if (id === 'top') {
      // Scroll to top
      if (mainContent) {
        mainContent.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      setActiveId('top')
    } else {
      const element = document.getElementById(id)
      if (element && mainContent) {
        const offset = 80 // Account for fixed header
        const containerRect = mainContent.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()
        const scrollPosition = elementRect.top - containerRect.top + mainContent.scrollTop - offset
        
        mainContent.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        })
      } else if (element) {
        // Fallback to window scroll
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - 80,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <nav className="toc-container">
      <h3 className="toc-title">On this page</h3>
      <ul className="toc-list">
        {/* Back to top link */}
        <li className={`toc-item toc-level-2 ${activeId === 'top' ? 'active' : ''}`}>
          <a
            href="#top"
            onClick={(e) => handleClick(e, 'top')}
            className="toc-link"
          >
            ↑ Back to top
          </a>
        </li>
        
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`toc-item toc-level-${heading.level} ${
              activeId === heading.id ? 'active' : ''
            }`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className="toc-link"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}