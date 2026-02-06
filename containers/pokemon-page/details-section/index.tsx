"use client";

import { useMemo } from "react";
import { Pokemon } from "@/types/Pokemon";
import AutocompleteInput from "@/components/AutocompleteInput";
import PokemonDetails from "@/components/PokemonDetails";
import { usePokemonStore } from "@/store/usePokemonStore";
import { useStoreHydration } from "@/hooks/useStoreHydration";

interface PokemonDetailsSectionProps {
  initialPokemon: Pokemon;
  pokemonName: string;
  pokemonList: Pokemon[];
}

export default function PokemonDetailsSection({ initialPokemon, pokemonName, pokemonList }: PokemonDetailsSectionProps) {
  useStoreHydration(pokemonList);
  
  const { getAncestors, pokemonMap } = usePokemonStore();

  const allNames = useMemo(() => {
    return Object.values(pokemonMap).map(n => n.data.name);
  }, [pokemonMap]);

  const ancestors = initialPokemon ? getAncestors(initialPokemon.name) : [];

  return (
    <section className="flex flex-col items-center gap-8 w-full">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold dark:text-white mb-6 text-center">Search Pokemon</h2>
        <AutocompleteInput 
          suggestionsList={allNames}
          placeholder="Enter pokemon name..."
          defaultValue={pokemonName}
        />
      </div>

      <div className="flex justify-center w-full">
          <PokemonDetails pokemon={initialPokemon} ancestors={ancestors} />
      </div>
    </section>
  );
}
