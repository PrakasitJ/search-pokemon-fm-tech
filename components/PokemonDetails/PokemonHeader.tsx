import { Pokemon } from "@/types/Pokemon";
import { getTypeColor } from "@/constants/typeColors";
import { getPokemonImage } from "@/libs/imageUtils";
import PokemonImage from "@/components/PokemonImage";

interface PokemonHeaderProps {
  pokemon: Pokemon;
}

export default function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 border-b pb-8 dark:border-zinc-700">
      <div className="relative w-full max-w-xs aspect-square sm:w-64 sm:h-64 shrink-0 flex items-center justify-center p-4">
        <PokemonImage
          src={getPokemonImage(pokemon.number)}
          alt={pokemon.name}
          fill
          priority
          className="object-contain relative z-10 drop-shadow-2xl"
        />
      </div>
      <div className="text-center sm:text-left flex-1">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-2 justify-center sm:justify-start">
            <h1 className="text-4xl sm:text-5xl font-black capitalize dark:text-white tracking-tight">
            {pokemon.name}
            </h1>
            <span className="text-2xl text-zinc-400 font-bold">#{pokemon.number}</span>
        </div>
        
        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium mb-4">
            {pokemon.classification} Pokemon
        </p>

        <div className="flex gap-3 mt-3 justify-center sm:justify-start">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-6 py-1.5 rounded-full text-base font-bold shadow-sm ${getTypeColor(type)}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
