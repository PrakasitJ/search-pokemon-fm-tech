import { Pokemon } from "@/types/Pokemon";

interface PokemonStatsProps {
  pokemon: Pokemon;
}

export default function PokemonStats({ pokemon }: PokemonStatsProps) {
  const MAX_CP = 4000;
  const MAX_HP = 450;
  const BAR_CP = Math.min((pokemon.maxCP / MAX_CP) * 100, 100);
  const BAR_HP = Math.min((pokemon.maxHP / MAX_HP) * 100, 100);

  return (
    <div className="bg-zinc-100 dark:bg-black/20 p-6 rounded-xl">
      <h3 className="text-xl font-bold dark:text-white mb-6">Stats Profile</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-4 h-fit">
            <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Height</span>
                <p className="text-lg font-medium dark:text-white">{pokemon.height.minimum} - {pokemon.height.maximum}</p>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Weight</span>
                <p className="text-lg font-medium dark:text-white">{pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
            </div>
            
            <div className="col-span-2 mt-2">
                 <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Flee Rate</span>
                    <p className="text-lg font-medium dark:text-white">{(pokemon.fleeRate * 100).toFixed(1)}% chance</p>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-5">
            <div>
                <div className="flex justify-between mb-1">
                    <span className="font-bold text-sm dark:text-white">Max CP</span>
                    <span className="font-bold text-sm text-blue-600 dark:text-blue-400">{pokemon.maxCP}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${BAR_CP}%` }}></div>
                </div>
            </div>

            <div>
                <div className="flex justify-between mb-1">
                    <span className="font-bold text-sm dark:text-white">Max HP</span>
                    <span className="font-bold text-sm text-green-600 dark:text-green-400">{pokemon.maxHP}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${BAR_HP}%` }}></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
