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
    <div className="ml-10">
      {/* <div className="virusPage inside"> */}
      {/* <div className="grid grid-cols"> */}
      <h1>Viruses</h1>
      <div className="grid grid-cols-3 gap-10">
        {viruses.map((virus) => {
          return (
            <div key={`virusId-${virus.id}`} style={{ position: 'relative' }}>
              <Link className="virusItem" href={`/viruses/${virus.id}`}>
                <div className="relative w-full aspect-square">
                  <Image
                    src={`/viruses/${virus.image}`}
                    alt={virus.virusName}
                    className="object-cover object-center"
                    fill
                    sizes="(min-width: 3840px) 100vw, (min-width: 2560px) 850px, (min-width: 1920px) 800px, (min-width: 1280px) 430px, (min-width: 768px) 350px, 100vw"
                    // priority={priority && id <= 2}
                    quality={75}
                  />
                </div>
                <h2>{virus.virusName}</h2>
                {virus.tagline ? <h3>({virus.tagline})</h3> : null}
                <div className="itemPrice">
                  € {Number(virus.price).toFixed(2)}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* </div> */}
    </div>
  );
}
