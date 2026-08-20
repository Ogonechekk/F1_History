'use client'

import { useEffect, useRef } from 'react'
import { assetPath } from '@/lib/asset-path'

export function ScrollExperience() {
  const progressRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let raf = 0
    let lastY = window.scrollY
    let speed = 0
    let direction: 'right' | 'left' = 'right'

    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const y = window.scrollY
      const progress = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0

      // velocity → speed streaks
      const signedDelta = y - lastY
      const delta = Math.abs(signedDelta)
      lastY = y

      if (delta > 0.5) {
        direction = signedDelta > 0 ? 'right' : 'left'
      }

      const targetSpeed = Math.min(delta / 32, 1)
      const response = targetSpeed > speed ? 0.32 : 0.09
      speed += (targetSpeed - speed) * response

      if (progressRef.current) {
        progressRef.current.style.setProperty('--progress', progress.toFixed(4))
      }
      if (stageRef.current) {
        stageRef.current.style.setProperty('--drive', progress.toFixed(4))
        stageRef.current.style.setProperty('--speed', speed.toFixed(3))
        stageRef.current.dataset.direction = direction
      }
      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <div ref={stageRef} className="scroll-stage" data-direction="right" aria-hidden="true">
        <div className="scroll-road" />
        <div className="scroll-car">
          <div className="car-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetPath('/images/scroll-car-cutout.png')} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
