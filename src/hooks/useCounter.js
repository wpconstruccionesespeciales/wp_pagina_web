import { useEffect, useState, useRef } from 'react'

export default function useCounter(target, isVisible, duration = 2000) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimatedRef.current) return

    hasAnimatedRef.current = true
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = Math.round(progress * target)

      setCount(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible, target, duration])

  return count
}
