import HeroSection from '../components/HeroSection.jsx';
import SpotifySection from '../components/SpotifySection.jsx';

import GallerySection from '../components/GallerySection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SpotifySection />
      
      <GallerySection />
      <Footer />
    </main>
  );
}
