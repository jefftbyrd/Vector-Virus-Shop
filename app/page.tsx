import Image from 'next/image';
import BigLogoDesktop from './components/BigLogoDesktop';
import BigLogoMobile from './components/BigLogoMobile';
import Featured from './components/Featured';
import News from './components/News';

export default function Home() {
  return (
    <>
      {/* <div className="sm:mb-10 lg:mt-12 sm:mb-14 md:mb-21 lg:mb-27 xl:mb-55 sm:block sticky top-0">
        <h1 className="font-grotesk font-black lg:justify-self-center text-right sm:text-center lowercase text-[#3acda8] text-8xl sm:text-[30vw] lg:text-[26vw] leading-none lg:leading-[12vw] -z-1">
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
      </div> */}
      <BigLogoMobile />
      <BigLogoDesktop />
      <div className="pt-[40vw] sm:pt-0">
        <Featured />
        <News />
      </div>
    </>
  );
}
