import Image from 'next/image';
import Link from 'next/link';
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
    <h2 className="font-ddin text-white text-2xl xl:text-3xl ml-2 xl:ml-3">
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
    <div className="overflow-hidden">
      {/* <Link href="/viruses">
        <h3 className="font-ddin text-2xl tracking-wider uppercase text-light-blue ml-3 font-black absolute right-3 top-3 border-b-2 z-100 hover:text-white hover:border-white transition-all duration-200 ease-in-out">
          &lt; All Viruses
        </h3>
      </Link> */}

      <div className="hidden md:block w-full aspect-square opacity-15 -z-10 fixed mt-5 md:mt-20">
        <Image
          src={`/viruses/${singleVirus.image}`}
          alt={singleVirus.virusName}
          className="object-cover object-center invert-90 drop-shadow-xl/50"
          fill
          sizes="(min-width: 3840px) 100vw, (min-width: 2560px) 850px, (min-width: 1920px) 800px, (min-width: 1280px) 430px, (min-width: 768px) 350px, 100vw"
          // priority={priority && id <= 2}
          quality={75}
        />
      </div>

      <div className="grid md:grid-cols-2 mx-5 sm:mx-10 xl:mx-20 2xl:mx-30 mt-5 sm:mt-0">
        <div className="w-full aspect-square z-20">
          <img
            src={`/viruses/${singleVirus.image}`}
            alt="nothing for now"
            className="drop-shadow-xl/20"
          />
          {/* <Image
            src={`/viruses/${singleVirus.image}`}
            alt={singleVirus.virusName}
            className="object-cover object-center w-full"
            fill
            sizes="(min-width: 3840px) 100vw, (min-width: 2560px) 850px, (min-width: 1920px) 800px, (min-width: 1280px) 430px, (min-width: 768px) 350px, 100vw"
            // priority={priority && id <= 2}
            quality={75}
          /> */}
        </div>
        <div className="flex flex-col justify-center gap-5 sm:pl-10 mt-3 sm:mt-0 z-10">
          <div>
            <h1 className="font-grotesk uppercase font-black text-5xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-white [text-shadow:0_0_1px_rgba(0,0,0,0.5),0_0_2px_rgba(0,0,0,0.3)]">
              {singleVirus.virusName}
            </h1>
            <Tagline show={!!singleVirus.tagline} singleVirus={singleVirus} />
          </div>
          <div className="w-40 lg:w-50 xl:w-auto">
            <div className="order-1 md:order-1 w-fit max-w-60">
              <div className="uppercase text-3xl lg:text-5xl text-white [text-shadow:0_0_1px_rgba(0,0,0,0.5),0_0_2px_rgba(0,0,0,0.3)]">
                € {Number(singleVirus.price).toFixed(2)}
              </div>

              <AddToCart virusId={singleVirus.id} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/50 mt-7 md:-mt-15 lg:-mt-25 pt-5 sm:pt-10 md:pt-15 lg:pt-20 pb-10 md:pb-20 px-5 sm:px-20 xl:px-30 2xl:px-40 backdrop-blur-xs drop-shadow-xl/20">
        <h3 className="font-grotesk font-bold uppercase text-2xl tracking-wider mb-3 hidden md:block">
          {singleVirus.virusName}
        </h3>
        <p>{singleVirus.virusDesc}</p>
      </div>
    </div>
  );
}
