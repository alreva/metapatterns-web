'use client'

import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

// Navigation data structure (shared from Navigation.tsx)
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

interface BottomNavigationProps {
  currentSlug: string
}

export default function BottomNavigation({ currentSlug }: BottomNavigationProps) {
  // Create a flat list of all pages in order
  const allPages: { title: string; slug: string }[] = []
  
  // Add home page first
  allPages.push({ title: 'Home', slug: 'home' })
  
  // Add all sections and their items in order
  for (const section of navigationData) {
    allPages.push({ title: section.title, slug: section.slug })
    for (const item of section.items) {
      allPages.push({ title: item.title, slug: item.slug })
    }
  }
  
  // Find current page index and parent section
  const normalizedSlug = currentSlug === '' ? 'home' : currentSlug
  const currentIndex = allPages.findIndex(page => page.slug === normalizedSlug)
  
  if (currentIndex === -1) {
    return null // Page not found in navigation
  }
  
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null
  
  // Find parent section for the current page
  let parentSection = null
  for (const section of navigationData) {
    // Check if current page is a sub-item of this section
    for (const item of section.items) {
      if (item.slug === normalizedSlug) {
        parentSection = section
        break
      }
    }
    if (parentSection) break
  }
  
  if (!prevPage && !nextPage && !parentSection) {
    return null // No navigation needed
  }
  
  return (
    <nav className="bottom-navigation">
      {parentSection && (
        <div className="parent-nav-container">
          <Link href={`/${parentSection.slug}`} className="parent-nav-link">
            <div className="parent-nav-inner">
              <ChevronUpIcon className="parent-nav-icon" />
              <div className="parent-nav-content">
                <div className="parent-nav-label">Back to</div>
                <div className="parent-nav-title">{parentSection.title}</div>
              </div>
            </div>
          </Link>
        </div>
      )}
      
      <div className="bottom-nav-container">
        {prevPage && (
          <Link href={`/${prevPage.slug}`} className="bottom-nav-link prev">
            <div className="bottom-nav-inner">
              <ChevronLeftIcon className="bottom-nav-icon" />
              <div className="bottom-nav-content">
                <div className="bottom-nav-label">Previous</div>
                <div className="bottom-nav-title">{prevPage.title}</div>
              </div>
            </div>
          </Link>
        )}
        
        {nextPage && (
          <Link href={`/${nextPage.slug}`} className="bottom-nav-link next">
            <div className="bottom-nav-inner">
              <div className="bottom-nav-content">
                <div className="bottom-nav-label">Next</div>
                <div className="bottom-nav-title">{nextPage.title}</div>
              </div>
              <ChevronRightIcon className="bottom-nav-icon" />
            </div>
          </Link>
        )}
      </div>
    </nav>
  )
}