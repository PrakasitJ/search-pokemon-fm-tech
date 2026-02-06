import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getPokemonByName, getPokemonList } from "@/actions/pokemon";
import PokemonDetailsSection from "@/containers/pokemon-page/details-section";
import { POKEMON_GEN1_LIMIT } from "@/constants/config";

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await getPokemonByName(name);

  if (!pokemon) {
    return {
      title: "Pokemon Not Found",
    };
  }

  return {
    title: `${pokemon.name} | Pokedex`,
    description: `Stats, attacks, and evolution details for ${pokemon.name}.`,
    openGraph: {
      images: [pokemon.image],
      title: `${pokemon.name} - Pokemon Stats`,
    },
  };
}

export default async function PokemonPage({ params }: Props) {
  const { name } = await params;
  
  const [pokemon, pokemonList] = await Promise.all([
    getPokemonByName(name),
    getPokemonList(POKEMON_GEN1_LIMIT)
  ]);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full flex flex-col items-center py-12 px-4 sm:px-8">
        <div className="w-full max-w-6xl flex justify-start mb-6">
             <Link href="/" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-sm font-medium flex items-center gap-2 transition-colors">
                <span className="text-lg">←</span> Back to Pokedex
             </Link>
        </div>
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading Details...</div>}>
            <PokemonDetailsSection initialPokemon={pokemon} pokemonName={name} pokemonList={pokemonList} />
        </Suspense>
      </main>
    </div>
  );
}
