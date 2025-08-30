'use client'

import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      const isDarkTheme = savedTheme === 'dark'
      setIsDark(isDarkTheme)
      // Theme is already set by the script in layout.tsx
    } else {
      // Default to dark theme
      setIsDark(true)
      // Theme is already set by the script in layout.tsx
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setIsDark(!isDark)
    
    // Update class instead of data-theme attribute
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    localStorage.setItem('theme', newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <SunIcon className="theme-toggle-icon" />
      ) : (
        <MoonIcon className="theme-toggle-icon" />
      )}
    </button>
  )
}