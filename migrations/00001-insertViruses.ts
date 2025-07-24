import { Sql } from 'postgres';

export const viruses = [
  {
    virus_name: 'Zika Virus',
    image: 'zika.webp',
    price: 960.0,
    virus_desc:
      'Zika virus is a member of the virus family Flaviviridae. It is spread by daytime-active Aedes mosquitoes, such as A. aegypti and A. albopictus. Its name comes from the Ziika Forest of Uganda, where the virus was first isolated in 1947. Zika virus shares a genus with the dengue, yellow fever, Japanese encephalitis, and West Nile viruses. Since the 1950s, it has been known to occur within a narrow equatorial belt from Africa to Asia. From 2007 to 2016, the virus spread eastward, across the Pacific Ocean to the Americas, leading to the 2015–2016 Zika virus epidemic.',
    featured: 1,
    new: 1,
    realm: 'Riboviria',
    kingdom: 'Orthornavirae',
    phylum: 'Kitrinoviricota',
    class: 'Flasuviricetes',
    v_order: 'Amarillovirales',
    v_family: 'Flaviviridae',
    genus: 'Flavivirus',
    species: 'Zika virus',
  },
  {
    virus_name: 'Flavivirin',
    image: 'yellow-fever.webp',
    price: 336.99,
    tagline: 'Yellow Fever',
    virus_desc:
      'Yellow fever is a viral disease that was first described in the mid-sixteenth century in Yucatán, Mexico. It is caused by yellow fever virus, an arbovirus (a virus transmitted by an insect vector) isolated in 1927, simultaneously in Ghana and at the Institut Pasteur de Dakar, Senegal. The disease is endemic in Africa and in Central and South America. The case fatality rate is high, fluctuating between 20 and 60% from one outbreak to the next. There is a safe, effective vaccine which provides long-term protection. The disease is re-emerging in some African and South American countries with poor vaccine coverage.',
    new: 1,
    featured: 1,
  },
  {
    virus_name: 'Mpox',
    image: 'mpox.webp',
    price: 930.0,
    tagline: 'monkeypox',
    virus_desc:
      'Monkeypox is a zoonotic illness caused by the monkeypox virus, an Orthopoxvirus in the same genus as the variola, vaccinia, and cowpox viruses. Since the detection of the first human case in the Democratic Republic of the Congo in 1970, the disease has caused sporadic infections and outbreaks, mainly restricted to some countries in west and central Africa. In July, 2022, WHO declared monkeypox a Public Health Emergency of International Concern, on account of the unprecedented global spread of the disease outside previously endemic countries in Africa and the need for global solidarity to address this previously neglected disease.',
  },
  {
    virus_name: 'Influenza',
    image: 'influenza.webp',
    price: 550.0,
    virus_desc:
      'Orthomyxoviridae (from Ancient Greek ὀρθός (orthós) "straight" and μύξα (mýxa) "mucus") is a family of negative-sense RNA viruses. It includes seven genera: Alphainfluenzavirus, Betainfluenzavirus, Gammainfluenzavirus, Deltainfluenzavirus, Isavirus, Thogotovirus, and Quaranjavirus. The first four genera contain viruses that cause influenza in birds (see also avian influenza) and mammals, including humans. Isaviruses infect salmon; the thogotoviruses are arboviruses, infecting vertebrates and invertebrates (such as ticks and mosquitoes).The Quaranjaviruses are also arboviruses, infecting vertebrates (birds) and invertebrates (arthropods).',
    featured: 1,
  },
  {
    virus_name: 'Poliovirus',
    image: 'polio.webp',
    price: 450.0,
    virus_desc:
      'Poliovirus infects human cells by binding to an immunoglobulin-like receptor, CD155 (also known as the poliovirus receptor or PVR) on the cell surface.Interaction of poliovirus and CD155 facilitates an irreversible conformational change of the viral particle necessary for viral entry. Following attachment to the host cell membrane, entry of the viral nucleic acid was thought to occur one of two ways: via the formation of a pore in the plasma membrane through which the RNA is then "injected" into the host cell cytoplasm, or via virus uptake by receptor-mediated endocytosis. Recent experimental evidence supports the latter hypothesis and suggests that poliovirus binds to CD155 and is taken up by endocytosis. Immediately after internalization of the particle, the viral RNA is released.',
    new: 1,
    realm: 'Riboviria',
    kingdom: 'Orthornavirae',
    phylum: 'Pisuviricota',
    class: 'Picornaviridae',
    v_order: 'Picornaviridae',
    v_family: 'Picornaviridae',
    genus: 'Enterovirus',
    species: 'Enterovirus C',
  },
  {
    virus_name: 'Adenovirus D26',
    image: 'adv-d26.webp',
    price: 1200.0,
    virus_desc:
      'Adenoviruses (members of the family Adenoviridae) are medium-sized (90–100 nm), nonenveloped (without an outer lipid bilayer) viruses with an icosahedral nucleocapsid containing a double-stranded DNA genome.Their name derives from their initial isolation from human adenoids in 1953.',
  },
  {
    virus_name: 'Escherichia T4',
    image: 'escherichia-t4.webp',
    price: 1350.0,
    virus_desc:
      'Escherichia virus T4 is a species of bacteriophages that infect Escherichia coli bacteria. It is a double-stranded DNA virus in the subfamily Tevenvirinae of the family Straboviridae. T4 is capable of undergoing only a lytic life cycle and not the lysogenic life cycle. The species was formerly named T-even bacteriophage, a name which also encompasses, among other strains (or isolates), Enterobacteria phage T2, Enterobacteria phage T4 and Enterobacteria phage T6.',
  },
  {
    virus_name: 'Dengue',
    image: 'dengue.webp',
    price: 1350.0,
    virus_desc:
      'Dengue virus (DENV) is the cause of dengue fever. It is a mosquito-borne, single positive-stranded RNA virus of the family Flaviviridae; genus Flavivirus.Four serotypes of the virus have been found, and a reported fifth has yet to be confirmed,all of which can cause the full spectrum of disease.Nevertheless, the mainstream scientific communitys understanding of dengue virus may be simplistic as, rather than distinct antigenic groups, a continuum appears to exist. This same study identified 47 strains of dengue virus.Additionally, coinfection with and lack of rapid tests for Zika virus and chikungunya complicate matters in real-world infections.',
    new: 1,
    realm: 'Riboviria',
    kingdom: 'Orthornavirae',
    phylum: 'Kitrinoviricota',
    class: 'Flasuviricetes',
    v_order: 'Amarillovirales',
    v_family: 'Flaviviridae',
    genus: 'Flavivirus',
    species: 'Dengue virus',
  },
  {
    virus_name: 'Cowpea Mosaic Virus',
    image: 'cowpea-mosaic-virus.webp',
    price: 990.0,
    virus_desc:
      'Cowpea mosaic virus (CPMV) is a non-enveloped plant virus of the comovirus group. Infection of a susceptible cowpea leaf causes a "mosaic" pattern in the leaf, and results in high virus yields (1-2 g/kg). Its genome consists of 2 molecules of positive-sense RNA (RNA-1 and RNA-2) which are separately encapsidated. Both RNA1 and RNA2 have a VPg (virus genome-linked protein) at the end, and polyadenylation at the end. Genomic RNA1 and RNA2 are expressed by a polyprotein processing strategy. RNA1 encodes helicase, VPg, protease and RdRp. RNA2 encodes movement protein and coat protein. The virus particles are 28 nm in diameter and contain 60 copies each of a Large (L) and Small (S) coat protein. The structure is well characterised to atomic resolution, and the viral particles are thermostable. The identification of the virus is attributed to Lister and Thresh in 1955, but it is now known as a variant of the Sunn-hemp mosaic virus.',
  },
  {
    virus_name: 'HSV-1',
    image: 'hsv-1.webp',
    price: 399.99,
    tagline: 'Herpes Simplex',
    virus_desc:
      'Herpes simplex virus 1 (cold sores) and 2 (genital herpes) (HSV-1 and HSV-2), also known by their taxonomic names Human alphaherpesvirus 1 and Human alphaherpesvirus 2, are two members of the human Herpesviridae family, a set of viruses that produce viral infections in the majority of humans. Both HSV-1 and HSV-2 are very common and contagious. They can be spread when an infected person begins shedding the virus.',
  },
  {
    virus_name: 'HSV-2',
    image: 'hsv-2.webp',
    price: 399.99,
    tagline: 'Herpes Simplex',
    virus_desc:
      'Genital herpes is a herpes infection of the genitals caused by the herpes simplex virus (HSV). Most people either have no or mild symptoms and thus do not know they are infected. When symptoms do occur, they typically include small blisters that break open to form painful ulcers. Flu-like symptoms, such as fever, aching, or swollen lymph nodes, may also occur. Onset is typically around 4 days after exposure with symptoms lasting up to 4 weeks. Once infected further outbreaks may occur but are generally milder.',
    new: 1,
  },
  {
    virus_name: 'Faustovirus',
    image: 'faustovirus.webp',
    price: 999.0,
    virus_desc:
      'Faustovirus is a genus of giant virus which infects amoebae associated with humans. The virus was first isolated in 2015 and shown to be around 0.2 micrometers in diameter with a double stranded DNA genome of 466 kilobases predicted to encode 451 proteins. Although classified as a nucleocytoplasmic large DNA virus (NCLDV), faustoviruses share less than a quarter of their genes with other NCLDVs; however, ~46% are homologous to bacterial genes and the remainder are orphan genes (ORFans). Specifically, the gene encoding the major capsid protein (MCP) of faustovirus is different than that of its most closely related giant virus, asfivirus, as well as other NCLDVs. In asfivirus, the gene encoding MCP is a single genomic fragment of ~2000 base pairs (bp), however, in faustovirus the MCP is encoded by 13 exons separated by 12 large introns.The exons have a mean length of 149 bp and the introns have a mean length of 1,273 bp. The presence of introns in faustovirus genes is highly unusual for viruses.',
  },
  {
    virus_name: 'Rhinovirus',
    image: 'rhinovirus.webp',
    price: 777.0,
    virus_desc:
      'The rhinovirus (from the Ancient Greek: ῥίς, romanized: rhis "nose", gen ῥινός, romanized: rhinos "of the nose", and the Latin: vīrus) is a positive-sense, single-stranded RNA virus belonging to the genus Enterovirus in the family Picornaviridae. Rhinovirus is the most common viral infectious agent in humans and is the predominant cause of the common cold.',
    featured: 1,
  },
  {
    virus_name: 'Simian Virus',
    image: 'simian.webp',
    price: 899.0,
    tagline: 'SV40',
    virus_desc:
      'A polyomavirus that is found in both monkeys and humans. Like other polyomaviruses, SV40 is a DNA virus that sometimes causes tumors in animals, but most often persists as a latent infection. SV40 has been widely studied as a model eukaryotic virus, leading to many early discoveries in eukaryotic DNA replication and transcription.',
    featured: 1,
  },
];

export async function up(sql: any) {
  // export async function up(sql: Sql) {
  for (const virus of viruses) {
    await sql`
      INSERT INTO
        viruses (
          virus_name,
          image,
          price,
          tagline,
          virus_desc,
          featured,
          new,
          realm,
          kingdom,
          phylum,
          class,
          v_order,
          v_family,
          genus,
          species
        )
      VALUES
        (
          ${virus.virus_name},
          ${virus.image},
          ${virus.price},
          ${virus.tagline},
          ${virus.virus_desc},
          ${virus.featured},
          ${virus.new},
          ${virus.realm},
          ${virus.kingdom},
          ${virus.phylum},
          ${virus.class},
          ${virus.v_order},
          ${virus.v_family},
          ${virus.genus},
          ${virus.species}
        )
    `;
  }
}

export async function down(sql: any) {
  for (const virus of viruses) {
    await sql`
      DELETE FROM viruses
      WHERE
        virus_name = ${virus.virus_name}
    `;
  }
}
