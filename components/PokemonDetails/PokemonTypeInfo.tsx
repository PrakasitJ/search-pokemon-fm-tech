import { Pokemon } from "@/types/Pokemon";
import { POKEMON_TYPES } from "@/constants/pokemonTypes";

interface PokemonTypeInfoProps {
  pokemon: Pokemon;
}

export default function PokemonTypeInfo({ pokemon }: PokemonTypeInfoProps) {
  const getTypeInteraction = (type: string) => {
    if (pokemon.weaknesses.includes(type)) return { multiplier: "200%", label: "2x", color: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800", category: "Weak" };
    if (pokemon.resistant.includes(type)) return { multiplier: "50%", label: "½x", color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800", category: "Resistant" };
    return { multiplier: "100%", label: "1x", color: "bg-zinc-50 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700", category: "Neutral" };
  };

  const interactions = POKEMON_TYPES.map(type => ({
     type,
     ...getTypeInteraction(type)
  }));

  const weak = interactions.filter(i => i.category === 'Weak');
  const resistant = interactions.filter(i => i.category === 'Resistant');
  const neutral = interactions.filter(i => i.category === 'Neutral');

  const Section = ({ title, items, colorClass }: { title: string; items: typeof interactions; colorClass?: string }) => {
    if (items.length === 0) return null;
    return (
        <div className="flex flex-col gap-2 p-4 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-zinc-800">
            <h4 className={`font-bold text-sm uppercase tracking-wider ${colorClass}`}>{title}</h4>
            <div className="flex flex-wrap gap-2">
                {items.map((i) => (
                    <span 
                        key={i.type} 
                        className={`
                            px-2.5 py-1 rounded-md text-sm font-semibold border flex items-center gap-1.5
                            ${i.color}
                        `}
                    >   
                        {i.type}
                        <span className="text-[10px] opacity-70 bg-black/10 dark:bg-white/10 px-1 rounded">
                            {i.multiplier}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
        🛡️ Element Effectiveness
      </h3>
      
      <div className="grid sm:grid-cols-2 gap-4">
          <Section title="Weak To (2x Damage)" items={weak} colorClass="text-red-600 dark:text-red-400" />
          <Section title="Resistant To (½x Damage)" items={resistant} colorClass="text-green-600 dark:text-green-400" />
      </div>

      <div className="mt-2">
         <div className="opacity-60 hover:opacity-100 transition-opacity">
            <h4 className="text-xs font-semibold uppercase text-zinc-400 mb-2">Neutral (1x Damage)</h4>
            <div className="flex flex-wrap gap-1.5">
                {neutral.map((i) => (
                    <span key={i.type} className="text-xs px-2 py-0.5 rounded border border-zinc-200 text-zinc-500 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500">
                        {i.type}
                    </span>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
}
