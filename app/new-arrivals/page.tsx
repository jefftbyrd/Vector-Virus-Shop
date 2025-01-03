import Image from 'next/image';
import Link from 'next/link';
import { getVirusesInsecure } from '../../database/viruses';

export const metadata = {
  title: 'Viruses',
  description: 'All your favorites in one place!',
};

export default async function NewArrivals() {
  const viruses = await getVirusesInsecure();

  const newViruses = viruses.filter((virus) => {
    if (virus.new !== '1') {
      return null;
    }
    return virus;
  });

  return (
    <div className="subGrid">
      <div className="inside">
        <div className="virusPage">
          <h1>New Arrivals</h1>
          <div className="virusProductsList">
            {newViruses.map((virus) => {
              return (
                <div
                  key={`virusId-${virus.id}`}
                  style={{ position: 'relative' }}
                >
                  <Link className="virusItem" href={`/viruses/${virus.id}`}>
                    <img src={`viruses/${virus.image}`} />
                    <h2>{virus.virusName}</h2>
                    <div className="itemPrice">
                      € {Number(virus.price).toFixed(2)}
                    </div>
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
