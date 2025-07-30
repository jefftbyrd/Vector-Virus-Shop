import Image from 'next/image';
import Link from 'next/link';
import { getVirusesInsecure } from '../../database/viruses';

export const metadata = {
  title: 'Viruses',
  description: 'All your favorites in one place!',
};

export default async function Viruses() {
  const viruses = await getVirusesInsecure();

  return (
    <div className="pageSpace">
      <h1 className="pageTitle">Viruses</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-7">
        {viruses.map((virus) => {
          return (
            <div
              className="h-full w-full flex"
              key={`virusId-${virus.id}`}
              style={{ position: 'relative' }}
            >
              <Link className="virusItem" href={`/viruses/${virus.id}`}>
                <div className="relative w-full aspect-square">
                  <Image
                    src={`/viruses/${virus.image}`}
                    alt={virus.virusName}
                    className="object-cover object-center w-fit sm:p-5"
                    fill
                    sizes="(min-width: 3840px) 100vw, (min-width: 2560px) 850px, (min-width: 1920px) 800px, (min-width: 1280px) 430px, (min-width: 768px) 350px, 100vw"
                    // priority={priority && id <= 2}
                    quality={75}
                  />
                </div>
                <h2 className="text-xl sm:text-3xl md:text-4xl 2xl:text-5xl font-grotesk font-normal text-white pt-2">
                  {virus.virusName}
                </h2>
                {virus.tagline ? <h3>({virus.tagline})</h3> : null}
                <div className="font-ddin text-light-green text-xl sm:text-3xl p-3 border-t-1 mt-3 border-light-green/30 w-fit self-center">
                  € {Number(virus.price).toFixed(2)}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
