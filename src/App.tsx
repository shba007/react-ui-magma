import { useEffect, useRef, Fragment, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

import SectionHero from './components/SectionHero'
import SectionBrief from './components/SectionBrief'
import SectionWorkspace from './components/SectionWorkspace'
import AppFooter from './components/AppFooter'

function loco(el: HTMLElement) {
  const locoScroll = new LocomotiveScroll({
    el,
    smooth: true,
  })
  locoScroll.on('scroll', ScrollTrigger.update)

  ScrollTrigger.scrollerProxy('#main', {
    scrollTop(value) {
      // @ts-expect-error type not available
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
    pinType: el.style.transform ? 'transform' : 'fixed',
  })

  // @ts-expect-error type not available
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update())

  ScrollTrigger.refresh()
}

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [globalGsap, setGlobalGsap] = useState<typeof gsap | null>(null)

  useEffect(() => {
    if (!scrollContainerRef.current) return
    gsap.registerPlugin(ScrollTrigger)
    loco(scrollContainerRef.current)
    setGlobalGsap(gsap)
  }, [])

  return (
    <main id="main" className="relative h-fit bg-[#183bd6] font-jost">
      <div className="relative" ref={scrollContainerRef}>
        <SectionHero />
        {globalGsap ? (
          <Fragment>
            <SectionBrief
              gsap={globalGsap}
              title="CERTIFY YOUR BUILDING AS A DIGITAL TWIN TOKEN (DTT®)"
              content="The Digital Twin Token is a unique digital asset backed by property
        data. Magma combines your building’s components and systems essential
        information into a DTT®."
            />
            <SectionWorkspace gsap={globalGsap} type="workshop" frameCount={67} />
            <SectionBrief
              gsap={globalGsap}
              title="CONNECT THE BUILDING'S TWIN TO YOUR STAKEHOLDERS"
              content="Users connect directly to the DTT® without any intermediaries. 
              As Stakeholder, they have the power to upload and verify information 
              that enriches the Digital Twin Token. A Stakeholder's ability to access 
              validated-data to perform tasks depends on their specific role."
            />
            <SectionWorkspace gsap={globalGsap} type="bridge" frameCount={55} />
            <SectionBrief
              gsap={globalGsap}
              title="INCREASE YOUR DIGITAL TWIN TOKEN’S VALUE"
              content="DTT® data increases the value of your digital asset by 
              lowering operational costs, improving energy use, assisting 
              commercialization, and boosting the liquidity of your building."
            />
            <SectionWorkspace gsap={globalGsap} type="bridge" frameCount={55} />
            <section className="h-screen">
              <video preload="auto" playsInline autoPlay loop muted>
                <source src={`${import.meta.env.VITE_BASE_URL}/videos/Feature.webm`} type="video/webm" />
                <source src={`${import.meta.env.VITE_BASE_URL}/videos/Feature.mp4`} type="video/mp4" />
              </video>
            </section>
            <AppFooter />
          </Fragment>
        ) : null}
      </div>
    </main>
  )
}

export default App
