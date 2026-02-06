export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface PokemonAttack {
  fast: Attack[];
  special: Attack[];
}

export interface PokemonEvolutionRequirement {
  amount: number;
  name: string;
}

export interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  types: string[];
  resistant: string[];
  attacks: PokemonAttack;
  weaknesses: string[];
  fleeRate: number; // Float
  maxCP: number; // Int
  evolutions: Pokemon[];
  evolutionRequirements: PokemonEvolutionRequirement;
  maxHP: number; // Int
  image: string;
}

export interface PokemonQueryResponse {
  pokemon: Pokemon;
  pokemons: Pokemon[];
}
