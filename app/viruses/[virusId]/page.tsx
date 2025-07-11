import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import type { Virus } from '../../../database/viruses';
import { getVirusInsecure } from '../../../database/viruses';
import AddToCart from './AddToCart';

interface PageProps {
  params: Promise<PageParams>;
}

interface PageParams {
  virusId: string;
  [key: string]: string | string[] | undefined;
}

interface GenerateMetadataProps {
  params: Promise<PageParams>;
}

interface TaglineProps {
  show: boolean;
  singleVirus: Virus;
}

interface ClassificationProps {
  show: boolean;
  singleVirus: Virus;
}

export async function generateMetadata(props: GenerateMetadataProps) {
  const params = await props.params;
  const singleVirus = await getVirusInsecure(Number(params.virusId));

  if (!singleVirus) {
    return {
      title: 'Virus Not Found',
      description: 'The requested virus could not be found',
    };
  }

  return {
    title: singleVirus.virusName,
    description: `This is the ${singleVirus.virusName} page`,
  };
}

function Tagline(props: TaglineProps) {
  if (!props.show) {
    return null;
  }
  return (
    <h2 className="font-ddin text-white text-5xl">
      ({props.singleVirus.tagline})
    </h2>
  );
}

function Classification(props: ClassificationProps) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="classification">
      <div>
        Realm
        <span>{props.singleVirus.realm}</span>
      </div>
      <div>
        Kingdom
        <span>{props.singleVirus.kingdom}</span>
      </div>
      <div>
        Phylum
        <span>{props.singleVirus.phylum}</span>
      </div>
      <div>
        Class
        <span>{props.singleVirus.class}</span>
      </div>
      <div>
        Order
        <span>{props.singleVirus.vOrder}</span>
      </div>
      <div>
        Family
        <span>{props.singleVirus.vFamily}</span>
      </div>
      <div>
        Genus
        <span>{props.singleVirus.genus}</span>
      </div>
      <div>
        Species
        <span>{props.singleVirus.species}</span>
      </div>
    </div>
  );
}

export default async function SingleVirusPage(props: PageProps) {
  const params = await props.params;
  const singleVirus: Virus | undefined = await getVirusInsecure(
    Number(params.virusId),
  );

  if (!singleVirus) {
    return notFound();
  }

  return (
    <>
      <div className="w-full aspect-square bigImage">
        <Image
          // src={singleVirus.image ?? ''}
          src={`/viruses/${singleVirus.image}`}
          alt={singleVirus.virusName}
          className="object-cover object-center"
          fill
          sizes="(min-width: 3840px) 100vw, (min-width: 2560px) 850px, (min-width: 1920px) 800px, (min-width: 1280px) 430px, (min-width: 768px) 350px, 100vw"
          // priority={priority && id <= 2}
          quality={75}
        />
      </div>
      {/* <img
        className="bigImage"
        alt={singleVirus.virusName}
        src={singleVirus.image ?? undefined}
      /> */}
      <div className="singleVirusPage ">
        {/* <div className="content"> */}
        <h1 className="font-grotesk uppercase font-black text-9xl lg:text-[12vw] text-white [text-shadow:0_0_1px_rgba(0,0,0,0.5),0_0_2px_rgba(0,0,0,0.3)]">
          {singleVirus.virusName}
        </h1>
        <Tagline show={!!singleVirus.tagline} singleVirus={singleVirus} />
        <div className="virusData">
          <div className="bg-black/60 w-1/2 p-5 outline outline-white/50 rounded-lg">
            <p className="text-2xl/9">{singleVirus.virusDesc}</p>
            <Classification
              show={!!singleVirus.realm}
              singleVirus={singleVirus}
            />
          </div>

          <div className="">
            <div className="uppercase text-9xl text-white [text-shadow:0_0_1px_rgba(0,0,0,0.5),0_0_2px_rgba(0,0,0,0.3)]">
              € {Number(singleVirus.price).toFixed(2)}
            </div>
            <div className="AddToCart">
              <AddToCart virusId={singleVirus.id} />
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
