import { CountUp } from '@/components/apex/count-up'
import { bigStats, eras, podium, standings } from '@/components/apex/data'
import { Reveal } from '@/components/apex/reveal'
import { ScrollExperience } from '@/components/apex/scroll-experience'
import { TopBar } from '@/components/apex/top-bar'
import { WinsBars } from '@/components/apex/wins-bars'
import { assetPath } from '@/lib/asset-path'

export default function Page() {
  return (
    <main className="apex">
      <div className="grain" aria-hidden="true" />
      <ScrollExperience />
      <TopBar />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">1950—2026 · Всемирный чемпионат</p>
          <h1>
            Скорость
            <br />
            <em>вне времени</em>
          </h1>
          <p className="lead">
            Восемь десятилетий риска, инженерной дерзости и пилотов, которые
            ехали быстрее своего времени.
          </p>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span>77</span>
          <p>
            сезонов
            <br />
            истории
          </p>
        </div>
        <div className="scroll-note">
          Листайте, чтобы начать гонку <i aria-hidden="true">↓</i>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto" id="history">
        <Reveal as="p" className="section-index">
          01 / Наследие
        </Reveal>
        <Reveal as="h2" delay={80}>
          Каждая эпоха искала
          <br />
          свой способ <em>победить.</em>
        </Reveal>
        <Reveal as="p" delay={160}>
          Менялись моторы, материалы и правила. Не менялось одно: желание найти
          последнюю десятую секунды.
        </Reveal>
      </section>

      {/* TIMELINE */}
      <section className="timeline">
        {eras.map((era) => (
          <Reveal as="article" className="era" key={era.n}>
            <div className="era-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={era.img || assetPath('/placeholder.svg')}
                alt={`Гоночный болид эпохи ${era.decade} в музейной экспозиции`}
                loading={era.eager ? 'eager' : 'lazy'}
              />
              <span className="era-number">{era.n}</span>
              <span className="museum-label">Коллекция / {era.decade}</span>
            </div>
            <div className="era-copy">
              <div className="decade">{era.decade}</div>
              <p className="kicker">{era.kicker}</p>
              <h3>{era.title}</h3>
              <p className="era-text">{era.text}</p>
              <div className="era-meta">
                <span>Ключевые пилоты</span>
                <strong>{era.drivers}</strong>
              </div>
              <div className="era-stat">{era.stat}</div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* NUMBERS */}
      <section className="numbers" id="numbers">
        <div className="numbers-inner">
          <Reveal>
            <p className="section-index">02 / Язык цифр</p>
            <h2>
              История
              <br />
              <em>на табло</em>
            </h2>
          </Reveal>
          <div className="number-grid">
            {bigStats.map((s, i) => (
              <Reveal key={s.label} className="big-stat" delay={i * 90}>
                <strong>
                  <CountUp to={s.value} />
                </strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NOW / 2026 */}
      <section className="now" id="now">
        <Reveal className="now-head">
          <p className="section-index">03 / Здесь и сейчас</p>
          <p className="live">
            <i aria-hidden="true" /> Данные после 11 этапов
          </p>
          <h2>
            Сезон
            <br />
            <em>2026</em>
          </h2>
          <p>
            Новый технический регламент сразу перемешал порядок. Mercedes задаёт
            темп, но четыре команды уже побеждали.
          </p>
        </Reveal>

        <div className="championship">
          <Reveal className="standings">
            <div className="table-title">
              <span>Личный зачёт</span>
              <small>Очки</small>
            </div>
            {standings.map((d) => (
              <div className="driver-row" key={d.pos}>
                <b>{d.pos}</b>
                <div>
                  <strong>{d.name}</strong>
                  <small>{d.team}</small>
                </div>
                <em>{d.pts}</em>
              </div>
            ))}
            <p className="as-of">Актуально на 8 августа 2026 года</p>
          </Reveal>

          <Reveal className="winner-card" delay={120}>
            <p>Последний Гран-при · Венгрия</p>
            <span className="round">Раунд 11 · 26 июля</span>
            <div className="winner-name">
              <small>Победитель</small>
              <strong>
                Ландо
                <br />
                Норрис
              </strong>
              <em>01</em>
            </div>
            <div className="podium">
              {podium.map((p) => (
                <div key={p.pos}>
                  <b>{p.pos}</b>
                  <span>
                    {p.name}
                    <small>{p.team}</small>
                  </span>
                  <em>{p.time}</em>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="wins">
          <Reveal>
            <p className="section-index">Победы в 2026</p>
            <h3>
              Кто берёт
              <br />
              клетчатый флаг
            </h3>
          </Reveal>
          <WinsBars />
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-mark" aria-hidden="true">
            APEX
          </div>
          <p>
            История не стоит на месте.
            <br />
            Она проходит круг за кругом.
          </p>
          <div className="footer-row">
            <a href="#top">Наверх ↑</a>
            <small>Неофициальный редакционный проект · 2026</small>
          </div>
        </div>
      </footer>
    </main>
  )
}
