import Image from 'next/image';
import Link from 'next/link';
import { getVirusesInsecure } from '../../database/viruses';

export default async function Featured() {
  const viruses = await getVirusesInsecure();

  const featuredViruses = viruses.filter((virus) => {
    if (!virus.featured) {
      return null;
    }
    return virus;
  });

  return (
    <div className="featured pt-5 pb-10 w-full">
      <h2 className="special">Featured Viruses</h2>
      <div className="grid sm:grid-cols-3 gap-5 xl:gap-20 px-10 py-5 xl:px-35 md:py-8">
        {featuredViruses.map((virus) => {
          return (
            <div key={`virusId-${virus.id}`} className="">
              <Link href={`/viruses/${virus.id}`}>
                <div className="relative w-full aspect-square flex items-center justify-center ">
                  <h3 className="z-20 text-white text-4xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5 xl 2xl:text-6xl font-grotesk text-shadow-lg/50">
                    {virus.virusName}
                  </h3>
                  <Image
                    src={`/viruses/${virus.image}`}
                    alt={virus.virusName}
                    className="object-cover object-center absolute inset-0 z-10 sm:opacity-70 sm:hover:opacity-100"
                    fill
                    sizes="(min-width: 3840px) 100vw, (min-width: 2560px) 850px, (min-width: 1920px) 800px, (min-width: 1280px) 430px, (min-width: 768px) 350px, 100vw"
                    quality={75}
                  />
                </div>
              </Link>
              <p className="line-clamp-3 w-3/4 m-auto text-center font-ddin text-sm">
                {virus.virusDesc}
              </p>
            </div>
          );
        })}
      </div>
      <Link href="/viruses">
        <h2 className="w-fit m-auto bg-light-green text-2xl sm:text-4xl rounded-xl p-5 text-dark-green uppercase outline-6 outline-middle-green tracking-wider bigButtonHover mt-5">
          Browse <span className="font-bold">all viruses</span>
        </h2>
      </Link>
    </div>
  );
}
