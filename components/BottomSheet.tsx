'use client'

import { useState, useEffect, useRef, useCallback, ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  peekHeight?: number
}

export default function BottomSheet({ 
  isOpen, 
  onClose, 
  children, 
  title,
  peekHeight = 0 
}: BottomSheetProps) {
  const [sheetHeight, setSheetHeight] = useState(peekHeight)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(0)
  const sheetRef = useRef<HTMLDivElement>(null)
  
  const minHeight = peekHeight
  const midHeight = window.innerHeight * 0.6
  const maxHeight = window.innerHeight * 0.95

  useEffect(() => {
    if (isOpen) {
      setSheetHeight(midHeight)
    } else {
      setSheetHeight(peekHeight)
    }
  }, [isOpen, midHeight, peekHeight])

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartY(e.touches[0].clientY)
    setStartHeight(sheetHeight)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const currentY = e.touches[0].clientY
    const deltaY = startY - currentY
    const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY))
    setSheetHeight(newHeight)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    // Snap to closest position
    const snapPositions = [minHeight, midHeight, maxHeight]
    const closest = snapPositions.reduce((prev, curr) => 
      Math.abs(curr - sheetHeight) < Math.abs(prev - sheetHeight) ? curr : prev
    )
    
    setSheetHeight(closest)
    
    // Close if snapped to minimum
    if (closest === minHeight && minHeight === 0) {
      onClose()
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartY(e.clientY)
    setStartHeight(sheetHeight)
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    
    const currentY = e.clientY
    const deltaY = startY - currentY
    const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY))
    setSheetHeight(newHeight)
  }, [isDragging, startY, startHeight, minHeight, maxHeight])

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    
    // Snap to closest position
    const snapPositions = [minHeight, midHeight, maxHeight]
    const closest = snapPositions.reduce((prev, curr) => 
      Math.abs(curr - sheetHeight) < Math.abs(prev - sheetHeight) ? curr : prev
    )
    
    setSheetHeight(closest)
    
    // Close if snapped to minimum
    if (closest === minHeight && minHeight === 0) {
      onClose()
    }
  }, [isDragging, minHeight, midHeight, maxHeight, sheetHeight, onClose])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <>
      {/* Backdrop */}
      {isOpen && sheetHeight > minHeight && (
        <div 
          className="bottom-sheet-backdrop"
          onClick={onClose}
        />
      )}
      
      {/* Sheet */}
      <div 
        ref={sheetRef}
        className={`bottom-sheet ${isOpen ? 'open' : ''}`}
        style={{ height: `${sheetHeight}px` }}
      >
        {/* Drag Handle */}
        <div 
          className="bottom-sheet-handle"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div className="bottom-sheet-handle-bar" />
        </div>
        
        {/* Header */}
        {title && (
          <div className="bottom-sheet-header">
            <h2 className="bottom-sheet-title">{title}</h2>
            <button
              onClick={onClose}
              className="bottom-sheet-close"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="bottom-sheet-content">
          {children}
        </div>
      </div>
    </>
  )
}