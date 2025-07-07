// import Image from 'next/image';
import Link from 'next/link';
import { getVirusesInsecure } from '../database/viruses';

export default async function Featured() {
  const viruses = await getVirusesInsecure();

  const featuredViruses = viruses.filter((virus) => {
    if (!virus.featured) {
      return null;
    }
    return virus;
  });

  return (
    <div className="featured">
      <h2 className="">Featured Viruses</h2>
      <div className="featuredGrid">
        {featuredViruses.map((virus) => {
          return (
            <div
              key={`virusId-${virus.id}`}
              style={{ backgroundImage: `url(viruses/${virus.image})` }}
              className="featuredItem"
            >
              <Link href={`/viruses/${virus.id}`}>
                <h3>{virus.virusName}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
