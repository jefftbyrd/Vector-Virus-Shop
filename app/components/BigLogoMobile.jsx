'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BigLogoMobile() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const { scrollY } = useScroll();

  const logoScale = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? [1, 0.35] : [0.35, 0.35],
  );
  const bigVirusOpacity = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? [1, 0] : [0, 0],
  );
  const topPosition = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? [-12, 3] : [3, 3],
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
  // const logoColor = useTransform(
  //   scrollY,
  //   [0, 100],
  //   isHomePage ? ['#3acda8', '#082922'] : ['#3acda8', '#3acda8'],
  // );
  const headerSpace = isHomePage ? ['0px'] : ['60px'];

  return (
    <div
      className="relative "
      style={{
        height: headerSpace,
      }}
    >
      <motion.div
        className="w-full fixed z-50 sm:hidden drop-shadow-lg/30"
        style={{
          height: headerHeight,
          backgroundColor: bgColorShift,
        }}
      >
        <motion.div
          className="absolute w-full sm:mb-10 lg:mt-12 sm:mb-14 md:mb-21 lg:mb-27 xl:mb-55 sm:block origin-top"
          style={{
            scale: logoScale,
            top: topPosition,
          }}
        >
          <motion.h1
            className="font-grotesk font-black lg:justify-self-center sm:text-center lowercase text-[#3acda8] text-[24vw] sm:text-[30vw] lg:text-[26vw] leading-none lg:leading-[12vw] -z-10 h-fit w-fit m-auto"
            // style={{ color: logoColor }}
          >
            <Link href="/">Vector</Link>
          </motion.h1>

          <motion.div
            className="absolute right-[8vw] sm:mt-[0vh] lg:mt-[6vh] xl:mt-[9vh] text-[5vw] text-white -z-10 uppercase font-normal font-grotesk leading-none"
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
    </div>
  );
}
