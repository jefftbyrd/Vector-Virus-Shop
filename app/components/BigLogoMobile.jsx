'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function BigLogoMobile() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const { scrollY } = useScroll();

  // Always create transforms, but use static values on non-homepage
  const logoScale = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? [1, 0.45] : [0.45, 0.45],
  );
  const bigVirusOpacity = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? [1, 0] : [0, 0],
  );
  const topPosition = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? [-12, -2] : [-2, -2],
  );
  const headerHeight = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? ['40vw', '11vw'] : ['11vw', '11vw'],
  );
  const bgColorShift = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? ['#0e372e', '#185d4e'] : ['#185d4e', '#185d4e'],
  );
  const logoColorShift = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? ['#3acda8', '#082922'] : ['#082922', '#082922'],
  );

  return (
    <motion.div
      className="w-full h-30 fixed z-30 sm:hidden"
      style={{
        height: headerHeight,
        backgroundColor: bgColorShift,
      }}
    >
      <motion.div
        className="top-0 w-full sm:mb-10 lg:mt-12 sm:mb-14 md:mb-21 lg:mb-27 xl:mb-55 sm:block origin-top w-full fixed"
        style={{
          scale: logoScale,
          top: topPosition,
        }}
      >
        <motion.h1
          className="font-grotesk font-black lg:justify-self-center text-center sm:text-center lowercase text-[#3acda8] text-[24vw] sm:text-[30vw] lg:text-[26vw] leading-none lg:leading-[12vw] -z-1"
          style={{ color: logoColorShift }}
        >
          Vector
        </motion.h1>
        <motion.div
          className="w-fit absolute right-[8vw] sm:mt-[0vh] lg:mt-[6vh] xl:mt-[9vh] text-[5vw] text-white -z-10 uppercase font-normal font-grotesk leading-none"
          style={{ opacity: bigVirusOpacity }}
        >
          The virus shop
        </motion.div>
        <motion.div
          className="absolute z-10 sm:top-[18vh] sm:top-[20vh] md:top-[23vh] xl:top-[21vh] 2xl:top-[24vh] sm:left-[21.5vw] md:left-[21.5vw] lg:left-[23.6vw] w-1/3  -translate-y-[15vw] translate-x-[22vw]"
          style={{ opacity: bigVirusOpacity }}
        >
          <Image
            src="/viruses/adenovirus-home.webp"
            alt="Vector, the virus shop"
            width={500}
            height={300}
            className="sm:w-[27vw] h-auto drop-shadow-xl/20"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
