import { create } from 'zustand';
import { Pokemon } from '@/types';
import { PokemonNode } from '@/libs';

interface PokemonStore {
  pokemonMap: Record<string, PokemonNode>;
  isInitialized: boolean;
  setPokemonMap: (map: Record<string, PokemonNode>) => void;
  getAncestors: (name: string) => Pokemon[];
}

export const usePokemonStore = create<PokemonStore>((set, get) => ({
  pokemonMap: {},
  isInitialized: false,
  setPokemonMap: (map) => set({ pokemonMap: map, isInitialized: true }),
  getAncestors: (name) => {
    const { pokemonMap } = get();
    const ancestors: Pokemon[] = [];
    let currentName = name;
    
    let attempts = 0;
    while (attempts < 10) {
      const node = pokemonMap[currentName?.toLowerCase()];
      if (!node || !node.parent) break;
      
      const parentNode = pokemonMap[node.parent.toLowerCase()];
      if (parentNode) {
        ancestors.unshift(parentNode.data);
        currentName = parentNode.data.name;
      } else {
        break;
      }
      attempts++;
    }
    
    return ancestors;
  }
}));
