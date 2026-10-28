import { Background } from './components/sections/Background';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { Product } from './components/sections/Product';
import { Partners } from './components/sections/Partners';
import { Benefits } from './components/sections/Benefits';
import { Features } from './components/sections/Features';
import { Solutions } from './components/sections/Solutions';
import { Metrics } from './components/sections/Metrics';
import { Testimonials } from './components/sections/Testimonials';
import { Pricing } from './components/sections/Pricing';
import { Footer } from './components/sections/Footer';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="pwb-body-wrap">
        <Background /><Header />
        <main id="main-content">
          <div className="pwb-anchor" id="i3owk" aria-hidden="true" />
          <Hero /><Product /><Partners />
          <div className="pwb-anchor" id="i3owk-2-3" aria-hidden="true" />
          <Benefits /><Features /><Solutions /><Metrics />
          <div className="pwb-anchor" id="i3owk-2-2-3" aria-hidden="true" />
          <Testimonials /><Pricing />
          <div className="pwb-anchor" id="i3owk-2-2-2" aria-hidden="true" />
        </main>
        <Footer />
        <div className="pwb-anchor" id="i3owk-2-2-2-2" aria-hidden="true" />
      </div>
    </>
  );
}
