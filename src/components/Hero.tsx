import React, { useEffect, useRef } from 'react'

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
  }, []) // ✅ add dependency array so it only runs once
  return (
    <section id='hero'>
      <div>
        <h1>MacBook Pro</h1>
        <img src="/title.png" alt="MacBook Title" />
      </div>

      <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />

      <button>About</button>
      <p>From this to that</p>
    </section>
  )
}

export default Hero
