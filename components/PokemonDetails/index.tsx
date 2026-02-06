import { Pokemon } from "@/types/Pokemon";
import EvolutionChain from "./EvolutionChain";
import PokemonHeader from "./PokemonHeader";
import PokemonStats from "./PokemonStats";
import PokemonTypeInfo from "./PokemonTypeInfo";
import PokemonAttacks from "./PokemonAttacks";
import PokemonCounters from "./PokemonCounters";

interface PokemonDetailsProps {
  pokemon: Pokemon;
  ancestors: Pokemon[];
}

export default function PokemonDetails({ pokemon, ancestors }: PokemonDetailsProps) {
  return (
    <div className="flex flex-col gap-10 w-full max-w-6xl bg-white dark:bg-zinc-900/50 p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm">
      <PokemonHeader pokemon={pokemon} />
      
      <div className="grid lg:grid-cols-2 gap-8">
         <div className="flex flex-col gap-8">
            <PokemonStats pokemon={pokemon} />
            <PokemonTypeInfo pokemon={pokemon} />
         </div>
         <div className="flex flex-col gap-8">
            <PokemonAttacks pokemon={pokemon} />
            <PokemonCounters pokemon={pokemon} />
         </div>
      </div>

      <EvolutionChain pokemon={pokemon} ancestors={ancestors} />
    </div>
  );
}
