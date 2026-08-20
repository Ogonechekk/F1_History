'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'colorful'

const THEMES: { id: Theme; label: string }[] = [
  { id: 'light', label: 'Светлая тема' },
  { id: 'dark', label: 'Тёмная тема' },
  { id: 'colorful', label: 'Цветная тема' },
]

export function TopBar() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as Theme | null
    if (current) setTheme(current)

    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const apply = (next: Theme) => {
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('apex-theme', next)
    } catch {
      /* ignore */
    }
  }

  return (
    <header className="topbar" data-scrolled={scrolled}>
      <a className="brand" href="#top" aria-label="Apex — в начало">
        <span>APEX</span>
        <small>История скорости</small>
      </a>

      <nav
        className={menuOpen ? 'open' : ''}
        aria-label="Основная навигация"
        onClick={() => setMenuOpen(false)}
      >
        <a href="#history">История</a>
        <a href="#numbers">Цифры</a>
        <a href="#now">Сезон 2026</a>
      </nav>

      <div className="bar-tools">
        <div
          className="theme-switch"
          role="group"
          aria-label="Выбор темы оформления"
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              data-mode={t.id}
              aria-pressed={theme === t.id}
              aria-label={t.label}
              title={t.label}
              onClick={() => apply(t.id)}
            >
              <span className="swatch" aria-hidden="true" />
            </button>
          ))}
        </div>

        <button
          className="menu-button"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? 'Закрыть' : 'Меню'}
        </button>
      </div>
    </header>
  )
}
