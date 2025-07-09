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
    <div className="featured pt-5 pb-10">
      <h2 className="special">Featured Viruses</h2>
      <div className="grid grid-cols-3 gap-40 px-40 py-8">
        {featuredViruses.map((virus) => {
          return (
            <div
              key={`virusId-${virus.id}`}
              className="opacity-70 hover:opacity-100"
            >
              <Link href={`/viruses/${virus.id}`}>
                <div className="relative w-full aspect-square flex items-center justify-center ">
                  <h3 className="z-20 text-white text-7xl font-grotesk text-shadow-lg/50">
                    {virus.virusName}
                  </h3>
                  <Image
                    src={`/viruses/${virus.image}`}
                    alt={virus.virusName}
                    className="object-cover object-center absolute inset-0 z-10"
                    fill
                    sizes="(min-width: 3840px) 100vw, (min-width: 2560px) 850px, (min-width: 1920px) 800px, (min-width: 1280px) 430px, (min-width: 768px) 350px, 100vw"
                    quality={75}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// return (
//     <div className="featured">
//       <h2 className="">Featured Viruses</h2>
//       <div className="featuredGrid">
//         {featuredViruses.map((virus) => {
//           return (
//             <div
//               key={`virusId-${virus.id}`}
//               style={{ backgroundImage: `url(viruses/${virus.image})` }}
//               className="featuredItem"
//             >
//               <Link href={`/viruses/${virus.id}`}>
//                 <h3>{virus.virusName}</h3>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
