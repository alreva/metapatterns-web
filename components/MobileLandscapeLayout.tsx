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

interface MobileLandscapeLayoutProps {
  navigationData: NavigationSection[]
  content: string
}

export default function MobileLandscapeLayout({ navigationData, content }: MobileLandscapeLayoutProps) {
  const pathname = usePathname()
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const [isTocOpen, setIsTocOpen] = useState(false)
  const [isMobileLandscape, setIsMobileLandscape] = useState(false)
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  useEffect(() => {
    const checkOrientation = () => {
      const isLandscape = window.matchMedia('(orientation: landscape)').matches
      const isSmallHeight = window.matchMedia('(max-height: 600px)').matches
      setIsMobileLandscape(isLandscape && isSmallHeight)
    }
    
    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)
    
    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  useEffect(() => {
    if (!isMobileLandscape) return

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
  }, [isMobileLandscape, lastScrollY])

  // Show nav when sheets are open
  useEffect(() => {
    if (isNavigationOpen || isTocOpen) {
      setIsBottomNavVisible(true)
    }
  }, [isNavigationOpen, isTocOpen])

  if (!isMobileLandscape) {
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