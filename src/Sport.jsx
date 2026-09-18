import { useState, useRef, useEffect } from 'react'
import { Waves, PersonStanding, CircleStar } from 'lucide-react'
import { Dumbbell } from "lucide-react";
import './Sport.css'
import { useLanguage } from "./LanguageContext.jsx";

const sportIds = ['suzish', 'gimnastika', 'futbol', 'taekvando']
const sportLabels = ['SWIMMING', 'GYMNASTICS', 'FOOTBALL', 'TAEKWONDO']
const sportColors = ['#5b9bd8', '#c96b8a', '#3a5fc4', '#0a1a5c']
const sportTints = ['#e8f1fb', '#f7e9ee', '#e8ecfb', '#e8eaf3']
const sportImages = [
  ['./pool.webp', './gallaryimages/basseyn-2.webp', './gallaryimages/basseyn-3.webp', './gallaryimages/basseyn-4.webp'],
  ['./gym.webp', './gallaryimages/gimnastika-zali/-2.webp', './gallaryimages/gimnastika-zali-3.webp', './gallaryimages/gimnastika-zali-4.webp'],
  ['./gym.webp', './gallaryimages/gimnastika-zali/-2.webp', './gallaryimages/gimnastika-zali-3.webp', './gallaryimages/gimnastika-zali-4.webp'],
  ['./gallaryimages/gimnastika-zali/-2.webp', './gym.webp', './gallaryimages/gimnastika-zali/-3.webp', './gallaryimages/gimnastika-zali/-4.webp'],
]
const sportIcons = [Waves, Dumbbell, CircleStar, PersonStanding]

export default function Sport(){
    const { t } = useLanguage();
    const SPORTS = t.sport.items.map((item, i) => ({
        id: sportIds[i],
        title: item.title,
        label: sportLabels[i],
        desc: item.desc,
        color: sportColors[i],
        tint: sportTints[i],
        images: sportImages[i],
        Icon: sportIcons[i],
    }))

    const [activeId, setActiveId] = useState(SPORTS[0].id)
    const [activeImgIdx, setActiveImgIdx] = useState(0)
    const [phase, setPhase] = useState('idle') 
    const timer = useRef(null)

    const sectionRef = useRef(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.unobserve(el)
                }
            },
            { threshold: 0.2 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const active = SPORTS.find(s => s.id === activeId)

    const selectSport = (id) => {
        if (id === activeId || phase !== 'idle') return
        setPhase('out')
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            setActiveId(id)
            setActiveImgIdx(0)
            setPhase('in')
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setPhase('idle'))
            })
        }, 230)
    }

    const selectImage = (idx) => {
        if (idx === activeImgIdx || phase !== 'idle') return
        setPhase('out')
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            setActiveImgIdx(idx)
            setPhase('in')
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setPhase('idle'))
            })
        }, 230)
    }

    return <>
<div id='sport' className={`sport-section ${inView ? 'in-view' : ''}`} ref={sectionRef}>
    <div className='sport-div'>

        <div className="sport__eyebrow">
          <span className="sport__eyebrow-line" />
          <span>{t.sport.eyebrow}</span>
        </div>

        <h2 className="sport__heading">
          <span className="sport__heading-main">{t.sport.headingMain}</span>
          <span className="sport__heading-gold">{t.sport.headingGold}</span>
        </h2>
    </div>
    <div className="sport-container">
        <div className="sport-left">
            <img
              className={`pool-img ${phase === 'out' ? 'pool-img--out' : ''} ${phase === 'in' ? 'pool-img--in' : ''}`}
              src={active.images[activeImgIdx]}
              alt={active.title}
            />

            <div className="sport-thumbs">
                {active.images.map((img, idx) => (
                    <button
                      key={img}
                      type="button"
                      className={`sport-thumb ${idx === activeImgIdx ? 'sport-thumb--active' : ''}`}
                      style={{ borderColor: idx === activeImgIdx ? active.color : 'transparent' }}
                      onClick={() => selectImage(idx)}
                      aria-label={`${active.title} ${idx + 1}`}
                    >
                        <img src={img} alt="" />
                    </button>
                ))}
            </div>
        </div>
        <div className="sport-right">
            {SPORTS.map((sport, i) => {
                const isActive = sport.id === activeId
                return (
                    <div
                      key={sport.id}
                      className={`sport__option ${isActive ? 'sport__option--active' : ''}`}
                      style={{
                          borderColor: isActive ? sport.color : 'transparent',
                          transitionDelay: `${0.15 + i * 0.1}s`,
                      }}
                      onClick={() => selectSport(sport.id)}
                    >
                        <div
                          className="sport__option-icon"
                          style={{
                              background: isActive ? sport.tint : '#f1e9da',
                          }}
                        >
                            <sport.Icon
                              size={30}
                              color={sport.color}
                              strokeWidth={1.8}
                            />
                        </div>
                        <div className="sport__option-body">
                            <div className="sport__option-title-row">
                                <span className="sport__option-title">{sport.title}</span>
                                <span className="sport__option-label">{sport.label}</span>
                            </div>
                            <span className="sport__option-desc">{sport.desc}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
</div>
</>
}