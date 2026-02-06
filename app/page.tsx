import PokemonsListSection from "@/containers/home-page/list-section";
import { getPokemonList } from "@/actions/pokemon";
import { Suspense } from "react";
import { POKEMON_GEN1_LIMIT } from "@/constants/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokemon Search | Pokedex",
  description: "Search and filter through the first 151 Pokemon. Find stats, evolutions, and attacks.",
};

export default async function PokemonsPage() {
  const pokemons = await getPokemonList(POKEMON_GEN1_LIMIT);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 sm:p-8">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
         <PokemonsListSection pokemonList={pokemons} />
      </Suspense>
    </div>
  );
}
