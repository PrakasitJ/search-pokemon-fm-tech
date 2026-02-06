"use client";

import { useEffect, useRef } from "react";
import { usePokemonStore } from "@/store/usePokemonStore";
import { Pokemon } from "@/types/Pokemon";
import { buildPokemonTreeMap } from "@/libs/pokemonTreeUtils";

export const useStoreHydration = (pokemonList: Pokemon[]) => {
  const { setPokemonMap, isInitialized } = usePokemonStore();
  const processed = useRef(false);

  useEffect(() => {
    if (!isInitialized && !processed.current && pokemonList.length > 0) {
      processed.current = true;
      
      const map = buildPokemonTreeMap(pokemonList);
      
      setPokemonMap(map);
    }
  }, [pokemonList, isInitialized, setPokemonMap]);
};
