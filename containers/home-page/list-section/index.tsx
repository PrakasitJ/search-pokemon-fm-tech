"use client";

import Link from "next/link";
import PokemonImage from "@/components/PokemonImage";
import { Pokemon } from "@/types/Pokemon";
import PokemonFilters from "@/components/PokemonFilters";
import { usePokemonFilter } from "@/hooks/usePokemonFilter";
import { useStoreHydration } from "@/hooks/useStoreHydration";

import { getTypeColor } from "@/constants/typeColors";
import { getPokemonImage } from "@/libs/imageUtils";
import { useMemo } from "react";

interface PokemonsListSectionProps {
  pokemonList: Pokemon[];
}

export default function PokemonsListSection({ pokemonList }: PokemonsListSectionProps) {
  useStoreHydration(pokemonList);

  const { filters, setFilters, resetFilters, filteredPokemons, totalCount } = usePokemonFilter(pokemonList);

  const { allNames, allAttacks } = useMemo(() => {
    const names = pokemonList.map(pokemon => pokemon.name);
    const attacks = new Set<string>();
    pokemonList.forEach(pokemon => {
      pokemon.attacks?.fast?.forEach(attack => { if(attack.name) attacks.add(attack.name) });
      pokemon.attacks?.special?.forEach(attack => { if(attack.name) attacks.add(attack.name) });
    });
    return { allNames: names, allAttacks: Array.from(attacks) };
  }, [pokemonList]);

  return (
    <div className="max-w-7xl mx-auto w-full py-8 px-4">
      <div className="relative mb-12 rounded-3xl bg-zinc-900 overflow-hidden shadow-2xl">
         <div className="absolute inset-0 opacity-10 flex justify-center items-center pointer-events-none">
            <svg width="600" height="600" viewBox="0 0 100 100" className="animate-spin-slow">
                 <path d="M50 5 A45 45 0 0 1 95 50 A45 45 0 0 1 50 95 A45 45 0 0 1 5 50 A45 45 0 0 1 50 5 Z" fill="none" stroke="white" strokeWidth="15" />
                 <path d="M5 50 L95 50" stroke="white" strokeWidth="5" />
                 <circle cx="50" cy="50" r="15" fill="white" />
                 <circle cx="50" cy="50" r="10" stroke="black" strokeWidth="2" fill="white" />
            </svg>
         </div>
         
         <div className="relative z-10 px-8 py-16 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                Pokedex<span className="text-red-500">.</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto font-medium">
                The ultimate guide to Generation I Pokemon. Search, filter, and discover strategies to become the very best.
            </p>
         </div>
         
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-white to-red-500 opacity-50"></div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <PokemonFilters 
          filters={filters} 
          setFilters={setFilters} 
          availableNames={allNames}
          availableAttacks={allAttacks}
        />

        <div className="flex-1 w-full">
            <div className="mb-6 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <span className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    {totalCount} Pokemon Found
                </span>
                
                <span className="text-xs text-zinc-400 font-mono hidden sm:block">
                    Displaying 1 - {filteredPokemons.length}
                </span>
            </div>
            
            {filteredPokemons.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700">
                  <div className="text-7xl mb-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">❓</div>
                  <h3 className="text-2xl font-bold dark:text-white mb-2">No Pokemon Found</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                    We couldn't find any Pokemon matching your current filters. Try resetting them!
                  </p>
                  <button 
                    onClick={resetFilters}
                    className="mt-6 px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
                  >
                    Clear Filters
                  </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredPokemons.map((pokemon) => (
                      <Link 
                          key={pokemon.id} 
                          href={`/pokemon/${pokemon.name.toLowerCase()}`}
                          className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-zinc-100 dark:border-zinc-800"
                      >
                          <div className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
                              <span className="text-xs font-black text-zinc-400 dark:text-zinc-500">#{pokemon.number}</span>
                          </div>

                          <div className="p-2 flex items-center justify-center relative overflow-hidden transition-transform duration-500">
                               {/* Image scale on hover */}
                              <div className="w-full aspect-square relative z-10 transition-transform duration-500 group-hover:scale-110">
                                  <PokemonImage 
                                      src={getPokemonImage(pokemon.number)}
                                      alt={pokemon.name} 
                                      fill
                                      className="object-contain drop-shadow-xl p-2" 
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                              </div>
                          </div>

                          <div className="p-5 flex flex-col gap-3">
                              <div>
                                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white capitalize truncate group-hover:text-red-500 transition-colors">
                                      {pokemon.name}
                                  </h2>
                                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate">
                                      {pokemon.classification}
                                  </p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                  {pokemon.types?.map(t => (
                                      <span 
                                        key={t} 
                                        className={`
                                            text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm
                                            ${getTypeColor(t)}
                                        `}
                                      >
                                          {t}
                                      </span>
                                  ))}
                              </div>

                              <div className="grid grid-cols-2 gap-2 mt-1 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                  <div className="flex flex-col">
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Max CP</span>
                                      <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{pokemon.maxCP}</span>
                                  </div>
                                  <div className="flex flex-col">
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Max HP</span>
                                      <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{pokemon.maxHP}</span>
                                  </div>
                              </div>
                          </div>
                      </Link>
                  ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
