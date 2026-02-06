import { Pokemon, Attack } from "@/types/Pokemon";
import { getTypeColor } from "@/constants/typeColors";

interface PokemonAttacksProps {
  pokemon: Pokemon;
}

const AttackCard = ({ attack }: { attack: Attack }) => (
  <div className="flex justify-between items-center p-3.5 bg-zinc-50 dark:bg-zinc-700/30 rounded-lg border border-zinc-100 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
      <span className="font-semibold dark:text-zinc-200">{attack.name}</span>
      <div className="text-right flex items-center gap-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getTypeColor(attack.type)}`}>
              {attack.type}
          </span>
          <span className="font-bold text-sm min-w-[3ch] text-right dark:text-zinc-300">
              {attack.damage}
          </span>
      </div>
  </div>
);

export default function PokemonAttacks({ pokemon }: PokemonAttacksProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
            ⚡ Fast Attacks
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            {pokemon.attacks.fast.map((attack) => (
                <AttackCard key={attack.name} attack={attack} />
            ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
            💥 Special Attacks
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            {pokemon.attacks.special.map((attack) => (
                <AttackCard key={attack.name} attack={attack} />
            ))}
        </div>
      </div>
    </div>
  );
}
