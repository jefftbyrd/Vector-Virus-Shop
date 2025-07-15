import Image from 'next/image';
// import styles from './page.module.css';
import Featured from './components/Featured';
import News from './components/News';

export default function Home() {
  return (
    <>
      <div className="mb-10 lg:mt-12 xl:mb-55 hidden sm:block">
        <h1 className="font-grotesk font-black lg:justify-self-center text-center lowercase text-[#3acda8] text-[30vw] lg:text-[26vw] leading-none lg:leading-[12vw] -z-1">
          Vector
        </h1>
        <h2 className="lg:mt-[9vh] text-center lg:text-right relative lg:-translate-x-[18.5vw] text-xl lg:text-[3.7vw] text-white -z-10 uppercase font-thin font-grotesk">
          The virus shop
        </h2>
        <div className="absolute z-10 lg:top-[16vh] lg:left-[23.6vw] w-2/5 aspect-[1648/1416] justify-self-center -translate-y-27">
          <Image
            src="/viruses/adenovirus-home.webp"
            alt="Vector, the virus shop"
            width={500} // Set desired width
            height={300} // Set actual height (for aspect ratio)
            className="lg:w-[27vw] h-auto"
          />
        </div>
      </div>
      <Featured />
      <News />
    </>
  );
}
