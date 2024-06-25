import React from 'react';
import './HomePage.css';
import Cards from './Cards';
import HeroSection from "./Hero";
import Footer from '../../components/footer/Footer';
import About from './About';
import MakeApp from './MakeApp';
import Chatbot from './Chatbot';

function HomePage() {
  return (
    <>
      <HeroSection />
      <About />
      <Cards />
      <MakeApp />
      <Footer />
      <Chatbot />
    </>
  );
}

export default HomePage;
