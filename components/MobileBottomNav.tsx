'use client'

import { useState } from 'react'
import { HomeIcon, BookOpenIcon, ListBulletIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { HomeIcon as HomeIconSolid, BookOpenIcon as BookOpenIconSolid, ListBulletIcon as ListBulletIconSolid } from '@heroicons/react/24/solid'
import Link from 'next/link'

interface MobileBottomNavProps {
  onNavigationClick: () => void
  onTocClick: () => void
  currentPath: string
  isVisible?: boolean
}

export default function MobileBottomNav({ 
  onNavigationClick, 
  onTocClick,
  currentPath,
  isVisible = true
}: MobileBottomNavProps) {
  const [activeTab, setActiveTab] = useState('content')

  const isHome = currentPath === '/' || currentPath === '/home' || currentPath === ''

  return (
    <nav className={`mobile-bottom-nav ${isVisible ? 'visible' : 'hidden'}`}>
      <Link 
        href="/"
        className={`mobile-bottom-nav-item ${isHome ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
      >
        {isHome ? (
          <HomeIconSolid className="mobile-bottom-nav-icon" />
        ) : (
          <HomeIcon className="mobile-bottom-nav-icon" />
        )}
        <span className="mobile-bottom-nav-label">Home</span>
      </Link>

      <button
        className={`mobile-bottom-nav-item ${activeTab === 'sections' ? 'active' : ''}`}
        onClick={() => {
          setActiveTab('sections')
          onNavigationClick()
        }}
      >
        {activeTab === 'sections' ? (
          <BookOpenIconSolid className="mobile-bottom-nav-icon" />
        ) : (
          <BookOpenIcon className="mobile-bottom-nav-icon" />
        )}
        <span className="mobile-bottom-nav-label">Sections</span>
      </button>

      <button
        className={`mobile-bottom-nav-item ${activeTab === 'toc' ? 'active' : ''}`}
        onClick={() => {
          setActiveTab('toc')
          onTocClick()
        }}
      >
        {activeTab === 'toc' ? (
          <ListBulletIconSolid className="mobile-bottom-nav-icon" />
        ) : (
          <ListBulletIcon className="mobile-bottom-nav-icon" />
        )}
        <span className="mobile-bottom-nav-label">On Page</span>
      </button>

      <button
        className="mobile-bottom-nav-item"
        onClick={() => {
          // TODO: Implement search
          console.log('Search clicked')
        }}
      >
        <MagnifyingGlassIcon className="mobile-bottom-nav-icon" />
        <span className="mobile-bottom-nav-label">Search</span>
      </button>
    </nav>
  )
}