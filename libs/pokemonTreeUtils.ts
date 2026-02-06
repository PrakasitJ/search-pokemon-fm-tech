import { Pokemon } from "@/types/Pokemon";

export interface PokemonNode {
  data: Pokemon;
  parent: string | null;
  children: string[];
  stage?: number;
}

export const buildPokemonTreeMap = (pokemonList: Pokemon[]): Record<string, PokemonNode> => {
  const map: Record<string, PokemonNode> = {};

  pokemonList.forEach((pokemon) => {
    map[pokemon.name.toLowerCase()] = {
      data: pokemon,
      parent: null,
      children: [],
    };
  });

  pokemonList.forEach((pokemon) => {
    if (pokemon.evolutions) {
      traverseEvolutions(pokemon, pokemon.evolutions, map);
    }
  });

  const queue: string[] = [];
  
  Object.keys(map).forEach((key) => {
    if (!map[key].parent) {
      map[key].stage = 1;
      queue.push(key);
    }
  });

  while (queue.length > 0) {
    const currentKey = queue.shift();
    if (!currentKey) continue;
    
    const currentNode = map[currentKey];
    if (currentNode && currentNode.stage) {
      currentNode.children.forEach((childName) => {
        const childKey = childName.toLowerCase();
        const childNode = map[childKey];
        if (childNode) {
          childNode.stage = currentNode.stage! + 1;
          queue.push(childKey);
        }
      });
    }
  }

  return map;
};

const traverseEvolutions = (
  parent: Pokemon,
  evolutions: Pokemon[],
  map: Record<string, PokemonNode>
) => {
  evolutions.forEach((evo) => {
    const node = map[evo.name.toLowerCase()];
    if (node) {
      node.parent = parent.name;
    }

    const parentNode = map[parent.name.toLowerCase()];
    if (parentNode && !parentNode.children.includes(evo.name)) {
      parentNode.children.push(evo.name);
    }

    if (evo.evolutions) {
      traverseEvolutions(evo, evo.evolutions, map);
    }
  });
};
