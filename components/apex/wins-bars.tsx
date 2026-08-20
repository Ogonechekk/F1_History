'use client'

import { useEffect, useRef, useState } from 'react'
import { wins } from './data'

export function WinsBars() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="bars" ref={ref}>
      {wins.map((w, i) => (
        <div className="bar" key={w.name}>
          <span>{w.name}</span>
          <span className="bar-track">
            <i
              className="bar-fill"
              style={{
                width: active ? `${w.pct}%` : 0,
                transitionDelay: `${i * 90}ms`,
              }}
            />
          </span>
          <b>{w.count}</b>
        </div>
      ))}
    </div>
  )
}
