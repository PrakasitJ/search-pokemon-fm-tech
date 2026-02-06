import Link from "next/link";
import PokemonImage from "@/components/PokemonImage";
import { Pokemon } from "@/types/Pokemon";
import { getPokemonImage } from "@/libs/imageUtils";

interface EvolutionChainProps {
  pokemon: Pokemon;
  ancestors: Pokemon[];
}

export default function EvolutionChain({ pokemon, ancestors }: EvolutionChainProps) {
  const getDirectEvolutions = (evos: Pokemon[] | undefined | null): Pokemon[] => {
    if (!evos) return [];
    
    const childIds = new Set<string>();
    evos.forEach(evo => {
      if (evo.evolutions) {
        evo.evolutions.forEach(child => childIds.add(child.id));
      }
    });

    return evos.filter(evo => !childIds.has(evo.id));
  };

  const directEvolutions = getDirectEvolutions(pokemon.evolutions);

  if (directEvolutions.length === 0 && ancestors.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t dark:border-zinc-700">
      <h3 className="text-xl font-bold mb-6 dark:text-white">Evolution Chain</h3>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
             
             {ancestors && ancestors.map((ancestor) => (
               <div key={ancestor.id} className="flex items-center gap-4">
                 <Link href={`/pokemon/${ancestor.name.toLowerCase()}`} scroll={false} className="group flex flex-col items-center">
                    <div className="w-20 h-20 p-2 bg-zinc-50 dark:bg-zinc-700 rounded-full group-hover:ring-2 ring-blue-400 transition-all relative">
                        <PokemonImage
                            src={getPokemonImage(ancestor.number)}
                            alt={ancestor.name}
                            fill
                            className="object-contain p-2"
                        />
                    </div>
                    <span className="mt-2 font-medium text-sm dark:text-zinc-200 group-hover:text-blue-500 transition-colors">
                        {ancestor.name}
                    </span>
                 </Link>

                 <div className="text-zinc-400 dark:text-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                 </div>
               </div>
             ))}

             <div className="flex flex-col items-center">
                <div className="w-20 h-20 p-2 bg-blue-50 dark:bg-zinc-700/50 rounded-full border-2 border-blue-500 relative">
                  <PokemonImage
                    src={getPokemonImage(pokemon.number)}
                    alt={pokemon.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <span className="mt-2 font-bold text-sm dark:text-white">{pokemon.name}</span>
             </div>
             
             {directEvolutions.length > 0 && (
                <div className="text-zinc-400 dark:text-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </div>
             )}

             <div className="flex flex-wrap gap-8 justify-center">
                {directEvolutions.map((evo) => (
                    <div key={evo.id} className="flex items-center gap-4">
                        <Link href={`/pokemon/${evo.name.toLowerCase()}`} scroll={false} className="group flex flex-col items-center">
                            <div className="w-20 h-20 p-2 bg-zinc-50 dark:bg-zinc-700 rounded-full group-hover:ring-2 ring-blue-400 transition-all relative">
                                <PokemonImage
                                    src={getPokemonImage(evo.number)}
                                    alt={evo.name}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <span className="mt-2 font-medium text-sm dark:text-zinc-200 group-hover:text-blue-500 transition-colors">
                                {evo.name}
                            </span>
                        </Link>

                        {evo.evolutions && evo.evolutions.length > 0 && (
                            <>
                                <div className="text-zinc-400 dark:text-zinc-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                                
                                <div className="flex flex-col gap-4">
                                     {evo.evolutions.map(subEvo => (
                                        <Link key={subEvo.id} href={`/pokemon/${subEvo.name.toLowerCase()}`} scroll={false} className="group flex flex-col items-center">
                                            <div className="w-20 h-20 p-2 bg-zinc-50 dark:bg-zinc-700 rounded-full group-hover:ring-2 ring-blue-400 transition-all relative">
                                                <PokemonImage
                                                    src={getPokemonImage(subEvo.number)}
                                                    alt={subEvo.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                            <span className="mt-2 font-medium text-sm dark:text-zinc-200 group-hover:text-blue-500 transition-colors">
                                                {subEvo.name}
                                            </span>
                                        </Link>
                                     ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
}
