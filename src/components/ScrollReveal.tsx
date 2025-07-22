import { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'left' | 'right' | 'scale'
  delay?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = '' 
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [delay])

  const getAnimationClass = () => {
    switch (direction) {
      case 'left':
        return 'scroll-reveal-left'
      case 'right':
        return 'scroll-reveal-right'
      case 'scale':
        return 'scroll-reveal-scale'
      default:
        return 'scroll-reveal'
    }
  }

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}