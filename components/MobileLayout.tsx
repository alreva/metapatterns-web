'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import MobileBottomNav from '@/components/MobileBottomNav'
import BottomSheet from '@/components/BottomSheet'
import MobileNavigation from '@/components/MobileNavigation'
import MobileTableOfContents from '@/components/MobileTableOfContents'

interface NavigationItem {
  title: string
  slug: string
}

interface NavigationSection {
  title: string
  slug: string
  items: NavigationItem[]
}

interface MobileLayoutProps {
  navigationData: NavigationSection[]
  content: string
}

export default function MobileLayout({ navigationData, content }: MobileLayoutProps) {
  const pathname = usePathname()
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const [isTocOpen, setIsTocOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  useEffect(() => {
    const checkMobile = () => {
      const isLandscape = window.matchMedia('(orientation: landscape)').matches
      const isSmallHeight = window.matchMedia('(max-height: 600px)').matches
      const isPortrait = window.matchMedia('(orientation: portrait)').matches
      const isSmallWidth = window.matchMedia('(max-width: 768px)').matches
      
      // Show mobile navigation for:
      // - Landscape mode with small height (original landscape case)
      // - Portrait mode with small width (new portrait case)
      setIsMobile((isLandscape && isSmallHeight) || (isPortrait && isSmallWidth))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('orientationchange', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsBottomNavVisible(true)
      } else {
        setIsBottomNavVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Add scroll listener with throttle
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll)
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [isMobile, lastScrollY])

  // Show nav when sheets are open
  useEffect(() => {
    if (isNavigationOpen || isTocOpen) {
      setIsBottomNavVisible(true)
    }
  }, [isNavigationOpen, isTocOpen])

  if (!isMobile) {
    return null
  }

  return (
    <>
      <MobileBottomNav
        onNavigationClick={() => setIsNavigationOpen(true)}
        onTocClick={() => setIsTocOpen(true)}
        currentPath={pathname}
        isVisible={isBottomNavVisible}
      />
      
      <BottomSheet
        isOpen={isNavigationOpen}
        onClose={() => setIsNavigationOpen(false)}
        title="Sections"
      >
        <MobileNavigation 
          navigationData={navigationData}
          onNavigate={() => setIsNavigationOpen(false)}
        />
      </BottomSheet>
      
      <BottomSheet
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        title="On This Page"
      >
        <MobileTableOfContents 
          content={content}
          onNavigate={() => setIsTocOpen(false)}
        />
      </BottomSheet>
    </>
  )
}