import Link from 'next/link';
import { getVirusesInsecure } from '../database/viruses';

export default async function NewArrivals() {
  const viruses = await getVirusesInsecure();

  const newViruses = viruses.filter((virus) => {
    if (!virus.new) {
      return null;
    }
    return virus;
  });

  console.log('viruses', viruses);

  return (
    <div className="subGrid">
      <div className="inside">
        <div className="newArrivals">
          <h2>New Arrivals</h2>
          <div className="newViruses">
            {newViruses.map((virus) => {
              return (
                <div
                  key={`virusId-${virus.id}`}
                  style={{ position: 'relative' }}
                >
                  <Link className="virusItem" href={`/viruses/${virus.id}`}>
                    <img src={`viruses/${virus.image}`} alt={virus.virusName} />
                    <h3>{virus.virusName}</h3>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
