// components/BannerSlider.jsx
import { useState, useEffect } from 'react'
import './BannerSlider.css'

const banners = [
  '/banners/banner1.png',
  '/banners/banner2.png',
  '/banners/banner3.png',
  '/banners/banner4.png'
]

function BannerSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length)
    }, 4000) // change every 4s
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="banner-slider">
      {banners.map((src, i) => (
        <img
          key={i}
          src={src}
          className={`banner-img ${i === index ? 'active' : ''}`}
          alt={`Banner ${i + 1}`}
        />
      ))}
      <div className="dots">
        {banners.map((_, i) => (
          <span key={i} className={`dot ${i === index ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  )
}

export default BannerSlider
