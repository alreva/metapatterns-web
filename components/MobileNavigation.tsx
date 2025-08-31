'use client'

import Link from 'next/link'
import { useState } from 'react'
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

interface MobileNavigationProps {
  navigationData: NavigationSection[]
  onNavigate?: () => void
}

export default function MobileNavigation({ navigationData, onNavigate }: MobileNavigationProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const cleanPath = pathname.replace(/^\//, '') || 'home'
    
    // Auto-expand current section
    for (const section of navigationData) {
      if (cleanPath === section.slug) {
        return new Set([section.slug])
      }
      
      for (const item of section.items) {
        if (cleanPath === item.slug) {
          return new Set([section.slug])
        }
      }
    }
    return new Set()
  })

  const toggleSection = (slug: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(slug)) {
      newExpanded.delete(slug)
    } else {
      newExpanded.add(slug)
    }
    setExpandedSections(newExpanded)
  }

  const handleLinkClick = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <div className="mobile-navigation">
      {navigationData.map((section) => {
        const currentPath = pathname.replace(/^\/+|\/+$/g, '') || 'home'
        const sectionSlug = section.slug.replace(/^\/+|\/+$/g, '')
        const isSectionActive = currentPath === sectionSlug
        
        return (
          <div key={section.slug} className="mobile-nav-group">
            <div className="mobile-nav-section-header">
              <Link 
                href={`/${section.slug}`} 
                className={`mobile-nav-section-link ${isSectionActive ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                <span>{section.title}</span>
              </Link>
              <button
                onClick={() => toggleSection(section.slug)}
                className="mobile-nav-toggle"
                aria-label={expandedSections.has(section.slug) ? 'Collapse' : 'Expand'}
              >
                {expandedSections.has(section.slug) ? (
                  <ChevronDownIcon className="mobile-nav-toggle-icon" />
                ) : (
                  <ChevronRightIcon className="mobile-nav-toggle-icon" />
                )}
              </button>
            </div>
            
            {expandedSections.has(section.slug) && (
              <div className="mobile-nav-items">
                {section.items.map((item) => {
                  const currentPath = pathname.replace(/^\/+|\/+$/g, '') || 'home'
                  const itemSlug = item.slug.replace(/^\/+|\/+$/g, '')
                  const isActive = currentPath === itemSlug
                  
                  return (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={handleLinkClick}
                    >
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}