import Image from 'next/image';
import Link from 'next/link';
import { getVirusesInsecure } from '../../database/viruses';

export default async function Recommended() {
  const viruses = await getVirusesInsecure();

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const recommendedViruses = shuffleArray(viruses).slice(0, 4);

  return (
    <>
      <div className="bg-linear-to-b from-black/30 to-[rgba(0, 0, 0, 0.2)] h-15 absolute w-full" />
      <div className="featured pt-5 sm:pt-10 pb-10 sm:pb-20 w-full">
        <h2 className="special">You may also like...</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 xl:gap-0 2xl:gap-20 px-5 sm:px-10 md:px-10 xl:px-20 2xl:px-40 py-5 xl:px-20 md:py-8">
          {recommendedViruses.map((virus) => {
            return (
              <div
                key={`virusId-${virus.id}`}
                className="hover:bg-black/40 p-5 sm:p-10 lg:p-5 xl:p-7 rounded-xl transition-all"
              >
                <Link
                  href={`/viruses/${virus.id}`}
                  className="flex flex-col gap-1 lg:gap-5"
                >
                  <div className="relative w-full aspect-square flex items-center justify-center group ">
                    <Image
                      src={`/viruses/${virus.image}`}
                      alt={virus.virusName}
                      className="object-cover object-center inset-0"
                      fill
                      sizes="(min-width: 3840px) 100vw, (min-width: 2560px) 850px, (min-width: 1920px) 800px, (min-width: 1280px) 430px, (min-width: 768px) 350px, 100vw"
                      quality={75}
                    />
                  </div>
                  <h3 className="z-10 text-white text-xl text-center sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl xl 2xl:text-4xl font-grotesk text-shadow-lg/50 uppercase">
                    {virus.virusName}
                  </h3>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="z-30">
          <Link href="/viruses" className="">
            <h2 className="w-fit m-auto bg-light-green text-2xl sm:text-4xl rounded-xl p-5 text-dark-green uppercase outline-6 outline-middle-green tracking-wider bigButtonHover mt-5">
              Browse <span className="font-bold">all viruses</span>
            </h2>
          </Link>
        </div>
        {/* <div className="bg-linear-to-b from-[rgba(0, 0, 0, 0.2)] to-black/50 h-90 absolute z-0 bottom-0  w-full" /> */}
      </div>
    </>
  );
}
