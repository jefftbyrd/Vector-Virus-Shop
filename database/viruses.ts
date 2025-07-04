// import 'server-only';
import { cache } from 'react';
import { sql } from './connect';

export type Virus = {
  id: number;
  virusName: string;
  image: string | null;
  price: number;
  tagline: string | null;
  virusDesc: string | null;
  featured: boolean | null;
  new: boolean | null;
  realm: string | null;
  kingdom: string | null;
  phylum: string | null;
  class: string | null;
  vOrder: string | null;
  vFamily: string | null;
  genus: string | null;
  species: string | null;
};

export const getVirusesInsecure = cache(async () => {
  const viruses = await sql<Virus[]>`
    SELECT
      *
    FROM
      viruses
  `;

  return viruses;
});

export const getVirusInsecure = cache(async (id: number) => {
  const [virus] = await sql<Virus[]>`
    SELECT
      *
    FROM
      viruses
    WHERE
      id = ${id}
  `;

  return virus;
});

// export function getViruses() {
//   return viruses;
// }

// export function getVirus(id) {
//   return viruses.find((virus) => virus.id === id);
// }
