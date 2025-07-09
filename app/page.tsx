// import Image from 'next/image';
// import styles from './page.module.css';
import Featured from './components/Featured';
import News from './components/News';

export default function Home() {
  return (
    <>
      <div className="mt-12 mb-55">
        <h1 className="font-grotesk font-black justify-self-center lowercase text-[#3acda8] text-[26vw] leading-[12vw] -z-1">
          Vector
        </h1>
        <h2 className="mt-[9vh] text-right relative -translate-x-[18.5vw] text-[3.7vw] text-white -z-10 uppercase font-thin font-grotesk">
          The virus shop
        </h2>
        <img
          src="viruses/adenovirus-home.webp"
          alt="Vector, the virus shop"
          className="absolute z-10 top-[16vh] left-[23.6vw] w-[27vw]"
        />
      </div>
      <Featured />
      <News />
    </>
  );
}
