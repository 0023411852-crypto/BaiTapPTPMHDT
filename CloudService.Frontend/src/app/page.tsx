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
import ScrollReveal from '../components/ScrollReveal'

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #f0f9ff 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #f8fafc 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #e0f2fe 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ScrollReveal><Promotion /></ScrollReveal>
        <ScrollReveal delay={100}><Services /></ScrollReveal>
        <ScrollReveal delay={100}><Infrastructure /></ScrollReveal>
        <ScrollReveal delay={100}><Pricing /></ScrollReveal>
        <ScrollReveal delay={100}><Testimonials /></ScrollReveal>
        <ScrollReveal delay={100}><News /></ScrollReveal>
        <ScrollReveal delay={100}><Affiliate /></ScrollReveal>
        <Footer />
      </div>
    </div>
  )
}
