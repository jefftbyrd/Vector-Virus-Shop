'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function BigLogoDesktop() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div
      style={{
        display: isHomePage ? 'block' : 'none',
      }}
    >
      <div className="mb-0 mt-12 lg:mt-24 sm:mb-0 md:mb-21 lg:mb-18 xl:mb-12 2xl:mb-46 hidden sm:block">
        <h1 className="font-grotesk font-black lg:justify-self-center text-center lowercase text-[#3acda8] text-[30vw] lg:text-[26vw] leading-none lg:leading-[12vw] -z-10">
          Vector
        </h1>
        <div className="sm:mt-[0vh] lg:mt-[6vh] xl:mt-[9vh] text-right -translate-x-[18.5vw] text-[3.7vw] text-white -z-10 uppercase font-thin font-grotesk">
          The virus shop
        </div>
        <div className="absolute z-10 sm:top-[18vh] sm:top-[20vh] md:top-[23vh] xl:top-[21vh] 2xl:top-[24vh] sm:left-[21.5vw] md:left-[21.5vw] lg:left-[23.6vw] w-2/5 aspect-[1648/1416] justify-self-center -translate-y-27">
          <Image
            src="/viruses/adenovirus-home.webp"
            alt="Vector, the virus shop"
            width={500}
            height={300}
            className="sm:w-[27vw] h-auto drop-shadow-xl/20"
          />
        </div>
      </div>
    </div>
  );
}
