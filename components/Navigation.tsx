'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface NavigationItem {
  title: string
  slug: string
}

interface NavigationSection {
  title: string
  slug: string
  items: NavigationItem[]
}

interface NavigationComponentProps {
  navigationData: NavigationSection[]
  className?: string
}

// Static navigation structure based on _Sidebar.md (fallback)
const fallbackNavigationData = [
  {
    title: 'Introduction',
    slug: 'introduction',
    items: [
      { title: 'About this book', slug: 'about-this-book' },
      { title: 'Metapatterns', slug: 'metapatterns' }
    ]
  },
  {
    title: 'Part 1. Foundations',
    slug: 'part-1-foundations/part-1-foundations',
    items: [
      { title: 'Modules and complexity', slug: 'part-1-foundations/modules-and-complexity' },
      { title: 'Forces, asynchronicity, and distribution', slug: 'part-1-foundations/forces-asynchronicity-and-distribution' },
      { title: 'Four kinds of software', slug: 'part-1-foundations/four-kinds-of-software' },
      { title: 'Arranging communication', slug: 'part-1-foundations/arranging-communication' }
    ]
  },
  {
    title: 'Part 2. Basic Metapatterns',
    slug: 'part-2-basic-metapatterns/part-2-basic-metapatterns',
    items: [
      { title: 'Monolith', slug: 'part-2-basic-metapatterns/monolith' },
      { title: 'Shards', slug: 'part-2-basic-metapatterns/shards' },
      { title: 'Layers', slug: 'part-2-basic-metapatterns/layers' },
      { title: 'Services', slug: 'part-2-basic-metapatterns/services' },
      { title: 'Pipeline', slug: 'part-2-basic-metapatterns/pipeline' }
    ]
  },
  {
    title: 'Part 3. Extension Metapatterns',
    slug: 'part-3-extension-metapatterns/part-3-extension-metapatterns',
    items: [
      { title: 'Middleware', slug: 'part-3-extension-metapatterns/middleware' },
      { title: 'Shared Repository', slug: 'part-3-extension-metapatterns/shared-repository' },
      { title: 'Proxy', slug: 'part-3-extension-metapatterns/proxy' },
      { title: 'Orchestrator', slug: 'part-3-extension-metapatterns/orchestrator' },
      { title: 'Combined Component', slug: 'part-3-extension-metapatterns/combined-component' }
    ]
  },
  {
    title: 'Part 4. Fragmented Metapatterns',
    slug: 'part-4-fragmented-metapatterns/part-4-fragmented-metapatterns',
    items: [
      { title: 'Layered Services', slug: 'part-4-fragmented-metapatterns/layered-services' },
      { title: 'Polyglot Persistence', slug: 'part-4-fragmented-metapatterns/polyglot-persistence' },
      { title: 'Backends for Frontends (BFF)', slug: 'part-4-fragmented-metapatterns/backends-for-frontends-bff' },
      { title: 'Service-Oriented Architecture (SOA)', slug: 'part-4-fragmented-metapatterns/service-oriented-architecture-soa' },
      { title: 'Hierarchy', slug: 'part-4-fragmented-metapatterns/hierarchy' }
    ]
  },
  {
    title: 'Part 5. Implementation Metapatterns',
    slug: 'part-5-implementation-metapatterns/part-5-implementation-metapatterns',
    items: [
      { title: 'Plugins', slug: 'part-5-implementation-metapatterns/plugins' },
      { title: 'Hexagonal Architecture', slug: 'part-5-implementation-metapatterns/hexagonal-architecture' },
      { title: 'Microkernel', slug: 'part-5-implementation-metapatterns/microkernel' },
      { title: 'Mesh', slug: 'part-5-implementation-metapatterns/mesh' }
    ]
  },
  {
    title: 'Part 6. Analytics',
    slug: 'part-6-analytics/part-6-analytics',
    items: [
      { title: 'Comparison of architectural patterns', slug: 'part-6-analytics/comparison-of-architectural-patterns' },
      { title: 'Ambiguous patterns', slug: 'part-6-analytics/ambiguous-patterns' },
      { title: 'Architecture and product life cycle', slug: 'part-6-analytics/architecture-and-product-life-cycle' },
      { title: 'Real-world inspirations for architectural patterns', slug: 'part-6-analytics/real-world-inspirations-for-architectural-patterns' },
      { title: 'The heart of software architecture', slug: 'part-6-analytics/the-heart-of-software-architecture' }
    ]
  },
  {
    title: 'Part 7. Appendices',
    slug: 'part-7-appendices/part-7-appendices',
    items: [
      { title: 'Appendix A. Acknowledgements', slug: 'part-7-appendices/appendix-a-acknowledgements' },
      { title: 'Appendix B. Books referenced', slug: 'part-7-appendices/appendix-b-books-referenced' },
      { title: 'Appendix C. Copyright', slug: 'part-7-appendices/appendix-c-copyright' },
      { title: 'Appendix D. Disclaimer', slug: 'part-7-appendices/appendix-d-disclaimer' },
      { title: 'Appendix E. Evolutions', slug: 'part-7-appendices/appendix-e-evolutions' },
      { title: 'Appendix F. Format of a metapattern', slug: 'part-7-appendices/appendix-f-format-of-a-metapattern' },
      { title: 'Appendix G. Glossary', slug: 'part-7-appendices/appendix-g-glossary' },
      { title: 'Appendix H. History of changes', slug: 'part-7-appendices/appendix-h-history-of-changes' },
      { title: 'Appendix I. Index of patterns', slug: 'part-7-appendices/appendix-i-index-of-patterns' }
    ]
  }
]

export default function Navigation({ navigationData, className = '' }: NavigationComponentProps) {
  const pathname = usePathname()
  const navData = navigationData && navigationData.length > 0 ? navigationData : fallbackNavigationData
  
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    // Always start with the current section expanded to avoid empty state
    const cleanPath = pathname.replace(/^\//, '') || 'home'
    
    for (const section of navData) {
      // Check if current path matches section slug
      if (cleanPath === section.slug) {
        return new Set([section.slug])
      }
      
      // Check if current path matches any item in the section
      for (const item of section.items) {
        if (cleanPath === item.slug) {
          return new Set([section.slug])
        }
      }
    }
    return new Set()
  })
  
  const [hasHydrated, setHasHydrated] = useState(false)

  // Find which section contains the current page
  const findCurrentSection = (currentPath: string): string | null => {
    const cleanPath = currentPath.replace(/^\//, '') || 'home'
    
    for (const section of navData) {
      if (cleanPath === section.slug) {
        return section.slug
      }
      
      for (const item of section.items) {
        if (cleanPath === item.slug) {
          return section.slug
        }
      }
    }
    return null
  }

  // Hydrate with localStorage data after mount
  useEffect(() => {
    let savedExpanded: Set<string> = new Set()
    
    try {
      const saved = localStorage.getItem('nav-expanded-sections')
      if (saved) {
        savedExpanded = new Set(JSON.parse(saved))
      }
    } catch {
      // Ignore errors
    }

    // Always include current section
    const currentSection = findCurrentSection(pathname)
    if (currentSection) {
      savedExpanded.add(currentSection)
    }

    setExpandedSections(savedExpanded)
    setHasHydrated(true)
  }, [pathname])

  // Save to localStorage
  useEffect(() => {
    if (hasHydrated) {
      localStorage.setItem('nav-expanded-sections', JSON.stringify([...expandedSections]))
    }
  }, [expandedSections, hasHydrated])

  const toggleSection = (slug: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(slug)) {
      newExpanded.delete(slug)
    } else {
      newExpanded.add(slug)
    }
    setExpandedSections(newExpanded)
  }

  return (
    <nav className={`sidebar ${className}`}>
      <div className="sidebar-header">
        <Link href="/" className="block">
          <h1 className="sidebar-title">
            Metapatterns
          </h1>
          <p className="sidebar-subtitle">
            Architecture Patterns Guide
          </p>
          <div className="sidebar-credits">
            <div className="credit-line">by Denys Poltorak</div>
            <div className="credit-line">edited by Lars Noodén</div>
          </div>
        </Link>
      </div>
      
      <div className="nav-content">
        <div className="nav-section">
          {navData.map((section) => {
            const currentPath = pathname.replace(/^\/+|\/+$/g, '') || 'home'
            const sectionSlug = section.slug.replace(/^\/+|\/+$/g, '')
            const isSectionActive = currentPath === sectionSlug
            
            return (
            <div key={section.slug} className="nav-group">
              <button
                onClick={() => toggleSection(section.slug)}
                className={`nav-toggle ${expandedSections.has(section.slug) ? 'expanded' : ''} ${
                  isSectionActive ? 'active' : ''
                }`}
              >
                <Link href={`/${section.slug}`} className="flex-1">
                  <span>{section.title}</span>
                </Link>
                {expandedSections.has(section.slug) ? (
                  <ChevronDownIcon className="nav-toggle-icon" />
                ) : (
                  <ChevronRightIcon className="nav-toggle-icon" />
                )}
              </button>
              
              <div className={`nav-items ${expandedSections.has(section.slug) ? 'expanded' : 'collapsed'}`}>
                {section.items.map((item) => {
                  // Normalize both paths by removing leading/trailing slashes
                  const currentPath = pathname.replace(/^\/+|\/+$/g, '') || 'home'
                  const itemSlug = item.slug.replace(/^\/+|\/+$/g, '')
                  const isActive = currentPath === itemSlug || (pathname === '/' && item.slug === 'home')
                  
                  return (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}