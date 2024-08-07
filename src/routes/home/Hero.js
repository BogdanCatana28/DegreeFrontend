import React from 'react';
import './Hero.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video.mp4' autoPlay loop muted />
      <h1 style={{ fontFamily: 'Abril Fatface' }}>Welcome to Neo Vet!</h1>
      <p style={{ fontFamily: 'Abril Fatface' }}>How can we help your little friend?</p>
      <svg className="arrows">
        <path className="a1" d="M0 0 L30 32 L60 0"></path>
        <path className="a2" d="M0 20 L30 52 L60 20"></path>
        <path className="a3" d="M0 40 L30 72 L60 40"></path>
      </svg>
    </div>
  );
}

export default HeroSection;