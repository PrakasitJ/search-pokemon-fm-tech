import Link from "next/link";
import PokemonImage from "@/components/PokemonImage";
import { usePokemonStore } from "@/store/usePokemonStore";
import { Pokemon } from "@/types/Pokemon";
import { useMemo } from "react";
import { getPokemonImage } from "@/libs/imageUtils";

interface PokemonCountersProps {
  pokemon: Pokemon;
}

export default function PokemonCounters({ pokemon }: PokemonCountersProps) {
  const { pokemonMap } = usePokemonStore();

  const { counters, targets } = useMemo(() => {
    if (!pokemonMap) return { counters: [], targets: [] };
    
    const allPokemons = Object.values(pokemonMap).map(n => n.data);
    
    const calculateScore = (attacker: Pokemon, defender: Pokemon) => {
        if (attacker.id === defender.id) return -999;

        let score = 0;

        attacker.types.forEach(t => {
            if (defender.weaknesses.includes(t)) {
                score += 2; 
            }
        });

        defender.types.forEach(t => {
            if (attacker.resistant.includes(t)) {
                score += 1;
            }
            if (attacker.weaknesses.includes(t)) {
                score -= 2;
            }
        });

        return score;
    };

    const evaluated = allPokemons.map(candidate => {
        return {
            candidate,
            counterScore: calculateScore(candidate, pokemon),
            targetScore: calculateScore(pokemon, candidate),
        };
    });

    interface ScoredPokemon {
      candidate: Pokemon;
      counterScore: number;
      targetScore: number;
    }

    const sortFn = (key: keyof ScoredPokemon) => (a: ScoredPokemon, b: ScoredPokemon) => {
        const valA = a[key];
        const valB = b[key];
        if (typeof valA === 'number' && typeof valB === 'number') {
            return valB - valA || (b.candidate.maxCP || 0) - (a.candidate.maxCP || 0);
        }
        return 0;
    }

    return {
        counters: evaluated
            .filter(x => x.counterScore > 0)
            .sort(sortFn('counterScore'))
            .slice(0, 6)
            .map(x => ({ ...x.candidate, advantage: Math.min(100 + (x.counterScore * 25), 300) })), // Cap at 300%
        targets: evaluated
            .filter(x => x.targetScore > 0)
            .sort(sortFn('targetScore'))
            .slice(0, 6)
            .map(x => ({ ...x.candidate, advantage: Math.min(100 + (x.targetScore * 25), 300) }))
    };

  }, [pokemon, pokemonMap]);

  if (counters.length === 0 && targets.length === 0) return null;

  const PokemonList = ({ title, list, colorClass, subtitle }: { title: string; list: (Pokemon & { advantage?: number })[]; colorClass?: string; subtitle?: string }) => (
    <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <span>{title.includes('Counter') ? '🛡️' : '⚔️'}</span> {title}
            <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 mt-1 ml-auto">
                {subtitle}
            </span>
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {list.map((pokemon) => (
                <Link 
                    key={pokemon.id} 
                    href={`/pokemon/${pokemon.name.toLowerCase()}`}
                    className="group flex flex-col items-center relative"
                >
                    <div className={`w-16 h-16 p-2 rounded-full transition-colors relative border ${colorClass}`}>
                        <PokemonImage
                            src={getPokemonImage(pokemon.number)}
                            alt={pokemon.name}
                            fill
                            className="object-contain p-2"
                        />
                        <div className="absolute -top-1 -right-1 bg-zinc-900 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm border border-zinc-700 z-10">
                            {pokemon.advantage}%
                        </div>
                    </div>
                    <span className="mt-1 text-xs font-bold text-center dark:text-zinc-200 group-hover:text-blue-500 truncate w-full">
                        {pokemon.name}
                    </span>
                    <div className="flex gap-0.5 justify-center mt-1">
                        {pokemon.types.map((t: string) => (
                            <div key={t} className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" title={t} />
                        ))}
                    </div>
                </Link>
            ))}
        </div>
    </div>
  );

  return (
    <div className="mt-6 pt-6 border-t dark:border-zinc-700 flex flex-col gap-8">
      {counters.length > 0 && (
          <PokemonList 
            title="Weak To (Suggested Counters)" 
            subtitle={`Efficient vs ${pokemon.name}`}
            list={counters}
            colorClass="bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 group-hover:bg-red-100 dark:group-hover:bg-red-900/40"
          />
      )}

      {targets.length > 0 && (
          <PokemonList 
            title="Strong Against" 
            subtitle={`${pokemon.name} is effective vs`}
            list={targets}
            colorClass="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800 group-hover:bg-green-100 dark:group-hover:bg-green-900/40"
          />
      )}
    </div>
  );
}
