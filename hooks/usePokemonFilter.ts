import { useState, useMemo, useCallback } from "react";
import { Pokemon, FilterState } from "@/types";
import { INITIAL_FILTERS } from "@/constants";
import { usePokemonStore } from "@/store";

const parseDimension = (dim: string) => {
    if (!dim) return 0;
    return parseFloat(dim.replace(/[^0-9.]/g, ''));
};

export function usePokemonFilter(pokemonList: Pokemon[] = []) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const { pokemonMap } = usePokemonStore();

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const filteredPokemons = useMemo(() => {
    if (!pokemonList) return [];

    const minHeightVal = filters.minHeight ? parseFloat(filters.minHeight) : 0;
    const minWeightVal = filters.minWeight ? parseFloat(filters.minWeight) : 0;
    const minCPVal = filters.minCP ? parseFloat(filters.minCP) : 0;
    const minHPVal = filters.minHP ? parseFloat(filters.minHP) : 0;
    const nameFilter = filters.name ? filters.name.toLowerCase() : "";
    const attackFilter = filters.attackName ? filters.attackName.toLowerCase() : "";

    return pokemonList.filter((pokemon) => {
      if (nameFilter && !pokemon.name.toLowerCase().includes(nameFilter)) {
        return false;
      }

      if (filters.types.length > 0) {
        const hasType = filters.types.some(type => pokemon.types?.includes(type));
        if (!hasType) return false;
      }

      if (filters.weaknesses.length > 0) {
        const hasWeakness = filters.weaknesses.some(type => pokemon.weaknesses?.includes(type));
        if (!hasWeakness) return false;
      }

      if (filters.resistant.length > 0) {
        const hasResistant = filters.resistant.some(type => pokemon.resistant?.includes(type));
        if (!hasResistant) return false;
      }

      if (filters.stages.length > 0) {
        const node = pokemonMap[pokemon.name.toLowerCase()];
        const stage = node?.stage || 1; 
        if (!filters.stages.includes(stage)) return false;
      }

      if (minHeightVal > 0) {
        const height = parseDimension(pokemon.height?.maximum); 
        if (height < minHeightVal) return false;
      }
      if (minWeightVal > 0) {
        const weight = parseDimension(pokemon.weight?.maximum);
        if (weight < minWeightVal) return false;
      }
      if (minCPVal > 0) {
        if ((pokemon.maxCP || 0) < minCPVal) return false;
      }
      if (minHPVal > 0) {
        if ((pokemon.maxHP || 0) < minHPVal) return false;
      }

      if (attackFilter) {
        const hasFast = pokemon.attacks?.fast?.some(attack => attack?.name && attack.name.toLowerCase().includes(attackFilter));
        const hasSpecial = pokemon.attacks?.special?.some(attack => attack?.name && attack.name.toLowerCase().includes(attackFilter));
        if (!hasFast && !hasSpecial) return false;
      }

      return true;
    });
  }, [pokemonList, filters, pokemonMap]);

  return {
    filters,
    setFilters,
    resetFilters,
    filteredPokemons,
    totalCount: filteredPokemons.length
  };
}
