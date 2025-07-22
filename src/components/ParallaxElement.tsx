import { useEffect, useRef } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface ParallaxElementProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxElement({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxElementProps) {
  const { scrollY } = useScrollAnimation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const offset = scrollY * speed
      ref.current.style.setProperty('--parallax-offset', `${offset}px`)
    }
  }, [scrollY, speed])

  return (
    <div
      ref={ref}
      className={`parallax-slow ${className}`}
    >
      {children}
    </div>
  )
}