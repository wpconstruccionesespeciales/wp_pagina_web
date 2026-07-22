import { useEffect, useState } from 'react'
import { whatsappUrl } from '../config/site'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:scale-110 active:scale-95 hover:shadow-xl hover:shadow-[#25D366]/40 transition-[transform,opacity,box-shadow] duration-200 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg viewBox="0 0 32 32" fill="white" className="w-7 h-7">
        <path d="M16.004 3.2C9.054 3.2 3.404 8.85 3.404 15.8c0 2.22.58 4.39 1.684 6.3L3.2 28.8l6.9-1.81a12.55 12.55 0 006.004 1.53h.005c6.95 0 12.6-5.65 12.6-12.6-.003-3.37-1.314-6.53-3.69-8.91A12.53 12.53 0 0016.004 3.2zm0 23.1a10.45 10.45 0 01-5.33-1.46l-.38-.23-3.95 1.04 1.06-3.87-.25-.4A10.42 10.42 0 015.5 15.8c0-5.79 4.71-10.5 10.51-10.5 2.81 0 5.45 1.09 7.43 3.08a10.44 10.44 0 013.07 7.43c-.003 5.79-4.713 10.5-10.503 10.5zm5.76-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.31-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.77-2.2-.18-.31-.02-.48.14-.64.14-.14.32-.37.47-.55.16-.18.21-.31.32-.53.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.76.75.33 1.34.52 1.8.67.75.24 1.44.21 1.98.13.6-.09 1.87-.77 2.13-1.5.27-.74.27-1.37.19-1.5-.08-.14-.29-.22-.61-.37z"/>
      </svg>
    </a>
  )
}
