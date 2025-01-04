import { useRef } from 'react'
import IconLogo from '../assets/logo.svg?react'

export default function SectionHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  if (videoRef.current) videoRef.current.disablePictureInPicture = false

  return (
    <section className="relative -z-10 h-screen" data-scroll data-scroll-speed="-5">
      <video className="absolute left-0 top-0 -z-10 h-screen w-screen object-cover" ref={videoRef} src="./videos/Hero.mp4" preload="auto" autoPlay loop muted playsInline />
      <header className="absolute left-0 right-0 top-0 px-8 pt-10 lg:px-32 lg:pt-[3.25rem]">
        <nav className="flex justify-between">
          <IconLogo className="aspect-square w-[3.5rem] text-white lg:w-[4.5rem] xl:w-[6rem]" />
        </nav>
      </header>
      <div className="mt-auto flex h-full flex-col justify-end px-[17rem] py-[9rem]">
        <div className="flex flex-col gap-24">
          <h1 className="text-[6rem] font-light leading-[12rem] lg:text-[12rem]">
            Experience Real
            <br /> Estate Agility
          </h1>
          <div className="flex items-start gap-16">
            <h3 className="max-w-[48rem] text-[2.4rem] font-light">Create a digital twin of your existing building and release the potential of Web3.</h3>
            <button className="rounded-full bg-white px-24 py-7 text-[1.8rem] font-medium uppercase text-[#183bd6]">learn more</button>
          </div>
        </div>
      </div>
    </section>
  )
}
