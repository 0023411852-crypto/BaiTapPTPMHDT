import Navbar from '../components/Navbar'
import Promotion from '../components/Promotion'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Infrastructure from '../components/Infrastructure'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import News from '../components/News'
import Affiliate from '../components/Affiliate'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-[#050c1a] overflow-x-hidden">
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #1d4ed8 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Promotion />
        <Services />
        <Infrastructure />
        <Pricing />
        <Testimonials />
        <News />
        <Affiliate />
        <Footer />
      </div>
    </div>
  )
}
