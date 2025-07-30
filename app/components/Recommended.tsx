import Image from 'next/image';
import Link from 'next/link';
import type { Virus } from '../../database/viruses';
import { getVirusesInsecure } from '../../database/viruses';

type Props = {
  id: number;
};

export default async function Recommended(props: Props) {
  const viruses: Virus[] = await getVirusesInsecure();

  const getRecommendedViruses = (
    viruses: Virus[],
    excludeId: number,
    count: number = 4,
  ): Virus[] => {
    const filtered = viruses.filter((virus) => virus.id !== excludeId);

    // Fisher-Yates shuffle
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j]!, filtered[i]!];
    }

    return filtered.slice(0, count);
  };

  const recommendedViruses = getRecommendedViruses(viruses, props.id);

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
                      sizes="(min-width: 1024px) 20vw, 40vw"
                      quality={55}
                      loading={
                        virus === recommendedViruses[0] ||
                        virus === recommendedViruses[1]
                          ? 'eager'
                          : 'lazy'
                      }
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
      </div>
    </>
  );
}
