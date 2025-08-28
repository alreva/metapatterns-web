'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// Static navigation structure based on _Sidebar.md
const navigationData = [
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

interface NavigationProps {
  className?: string
}

export default function Navigation({ className = '' }: NavigationProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  // Find which section contains the current page
  const findCurrentSection = (currentPath: string): string | null => {
    // Remove leading slash and handle home page
    const cleanPath = currentPath.replace(/^\//, '') || 'home'
    
    for (const section of navigationData) {
      // Check if current path matches section slug
      if (cleanPath === section.slug) {
        return section.slug
      }
      
      // Check if current path matches any item in the section
      for (const item of section.items) {
        if (cleanPath === item.slug) {
          return section.slug
        }
      }
    }
    return null
  }

  // Initialize and manage expanded sections
  useEffect(() => {
    // Load from localStorage
    const savedExpanded = localStorage.getItem('nav-expanded-sections')
    let initialExpanded: Set<string>
    
    if (savedExpanded) {
      try {
        initialExpanded = new Set(JSON.parse(savedExpanded))
      } catch {
        initialExpanded = new Set()
      }
    } else {
      initialExpanded = new Set()
    }

    // Always expand the section containing the current page
    const currentSection = findCurrentSection(pathname)
    if (currentSection) {
      initialExpanded.add(currentSection)
    }

    setExpandedSections(initialExpanded)
  }, [pathname])

  // Save to localStorage when expanded sections change
  useEffect(() => {
    localStorage.setItem('nav-expanded-sections', JSON.stringify([...expandedSections]))
  }, [expandedSections])

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
        </Link>
      </div>
      
      <div className="nav-content">
        <div className="nav-section">
          {navigationData.map((section) => (
            <div key={section.slug} className="nav-group">
              <button
                onClick={() => toggleSection(section.slug)}
                className={`nav-toggle ${expandedSections.has(section.slug) ? 'expanded' : ''} ${
                  pathname === `/${section.slug}` ? 'active' : ''
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
                  const isActive = pathname === `/${item.slug}` || (pathname === '/' && item.slug === 'home')
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
          ))}
        </div>
      </div>
    </nav>
  )
}