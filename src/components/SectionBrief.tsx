import { useEffect, useRef } from 'react'
import { gsap as g } from 'gsap'

export default function SectionBrief({ gsap, title, content }: { gsap: typeof g; title: string; content: string }) {
  const paraRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!(paraRef.current && paraRef.current.textContent)) return

    let clutter = ''
    paraRef.current.textContent.split('').forEach((dest) => {
      clutter += `<span>${dest}</span>`
    })
    paraRef.current!.innerHTML = clutter

    const el = paraRef.current.querySelectorAll('span')
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom 40%',
        scroller: '#main',
        scrub: 0.5,
      },
      stagger: 0.2,
      color: '#fff',
    })
  }, [])

  return (
    <section id="brief" className="flex h-screen flex-col gap-16 bg-[#2841f2] px-[17rem] py-[20rem]">
      <h6 className="text-[2.2rem]">{title}</h6>
      <p ref={paraRef} className="text-9xl font-light leading-[110%] -tracking-[0.05em] text-white/20">
        {content}
      </p>
    </section>
  )
}
