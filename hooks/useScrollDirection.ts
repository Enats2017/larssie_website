'use client'

import { useEffect, useRef, useState } from 'react'

export type ScrollDirection = 'up' | 'down'

export function useScrollDirection(threshold = 10) {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const diff = currentScrollY - lastScrollY.current

        if (Math.abs(diff) >= threshold) {
          setVisible(diff < 0 || currentScrollY < threshold)
          lastScrollY.current = currentScrollY
        }

        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return visible
}