import { POKEMON_TYPES } from "@/constants/pokemonTypes";
import AutocompleteInput from "@/components/AutocompleteInput";
import { usePokemonStore } from "@/store/usePokemonStore";
import { useMemo, useState, useEffect } from "react";
import { getTypeColor } from "@/constants/typeColors";
import { FilterState } from "@/types/Filter";

interface PokemonFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  availableNames?: string[];
  availableAttacks?: string[];
}

const FilterSection = ({ 
  title, 
  children, 
  isOpen, 
  onToggle 
}: { 
  title: string; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void; 
}) => {
  const [allowOverflow, setAllowOverflow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpen) {
      // Wait for transition (300ms) to finish before allowing overflow
      timeout = setTimeout(() => setAllowOverflow(true), 300);
    } else {
      setAllowOverflow(false);
    }
    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
  <div className="border-b border-zinc-100 dark:border-zinc-800 py-4 last:border-0 last:pb-0">
      <button 
          onClick={onToggle}
          className="flex items-center justify-between w-full text-left group"
      >
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
              {title}
          </span>
          <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] mt-3 opacity-100' : 'grid-rows-[0fr] opacity-0'
        } ${allowOverflow && isOpen ? 'overflow-visible' : 'overflow-hidden'}`}
      >
          <div className="min-h-0">
              {children}
          </div>
      </div>
  </div>
)};

export default function PokemonFilters({ filters, setFilters, availableNames, availableAttacks }: PokemonFiltersProps) {
  const { pokemonMap } = usePokemonStore();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'type': true,
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allNames = useMemo(() => {
    if (availableNames && availableNames.length > 0) return availableNames;
    return Object.values(pokemonMap).map(node => node.data.name);
  }, [pokemonMap, availableNames]);

  const allAttacks = useMemo(() => {
    if (availableAttacks && availableAttacks.length > 0) return availableAttacks;
    const attacks = new Set<string>();
    Object.values(pokemonMap).forEach(node => {
      node.data.attacks?.fast?.forEach(attack => { if(attack.name) attacks.add(attack.name) });
      node.data.attacks?.special?.forEach(attack => { if(attack.name) attacks.add(attack.name) });
    });
    return Array.from(attacks);
  }, [pokemonMap, availableAttacks]);

  const handleTypeChange = (field: 'types' | 'weaknesses' | 'resistant', type: string) => {
    const current = filters[field];
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    setFilters({ ...filters, [field]: next });
  };

  const handleStageChange = (stage: number) => {
    const next = filters.stages.includes(stage)
      ? filters.stages.filter((s) => s !== stage)
      : [...filters.stages, stage];
    setFilters({ ...filters, stages: next });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleNameChange = (name: string) => {
    setFilters({ ...filters, name });
  };

  const handleAttackChange = (attackName: string) => {
    setFilters({ ...filters, attackName });
  };

  const clearFilters = () => {
    setFilters({
        name: "",
        types: [],
        weaknesses: [],
        resistant: [],
        minHeight: "",
        minWeight: "",
        minCP: "",
        minHP: "",
        attackName: "",
        stages: []
    });
  };

  return (
    <div className="flex flex-col p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full lg:w-80 shrink-0 lg:sticky lg:top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar shadow-sm pb-40">
      <div className="flex items-center justify-between mb-4">
         <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
            🎛️ Filters
         </h2>
         <button 
           onClick={clearFilters}
           className="text-xs font-medium text-red-500 hover:text-red-600 underline"
         >
            Reset All
         </button>
      </div>

      {/* Name - Always Visible */}
      <div className="mb-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Search Name</label>
        <AutocompleteInput 
           value={filters.name}
           onChange={handleNameChange}
           placeholder="e.g. Pikachu"
           suggestionsList={allNames}
        />
      </div>

      {/* Attack Name */}
      <FilterSection title="Target Moves" isOpen={openSections['moves']} onToggle={() => toggleSection('moves')}>
        <AutocompleteInput 
           value={filters.attackName}
           onChange={handleAttackChange}
           placeholder="e.g. Solar Beam"
           suggestionsList={allAttacks}
        />
      </FilterSection>

      {/* Evolution Stage */}
      <FilterSection title="Evolution Stage" isOpen={openSections['stage']} onToggle={() => toggleSection('stage')}>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((stage) => (
            <button
              key={stage}
              onClick={() => handleStageChange(stage)}
              className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                filters.stages.includes(stage)
                  ? "bg-zinc-800 text-white border-zinc-800 dark:bg-white dark:text-black"
                  : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
              }`}
            >
              Stage {stage}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Types */}
      <FilterSection title="Pokemon Type" isOpen={openSections['type']} onToggle={() => toggleSection('type')}>
        <div className="flex flex-wrap gap-1.5">
          {POKEMON_TYPES.map((type) => {
            const isActive = filters.types.includes(type);
            const colorClass = getTypeColor(type);
            
            return (
                <button
                key={type}
                onClick={() => handleTypeChange('types', type)}
                className={`px-2.5 py-1 text-xs font-bold rounded-full border transition-all ${
                    isActive
                    ? `${colorClass} ring-2 ring-offset-2 ring-zinc-400 dark:ring-zinc-600`
                    : "bg-zinc-50 border-zinc-200 text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-500"
                }`}
                >
                {type}
                </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Weaknesses */}
      <FilterSection title="Weakness" isOpen={openSections['weakness']} onToggle={() => toggleSection('weakness')}>
        <div className="flex flex-wrap gap-1.5">
          {POKEMON_TYPES.map((type) => {
            const isActive = filters.weaknesses.includes(type);
            const colorClass = getTypeColor(type);
            
            return (
                <button
                key={type}
                onClick={() => handleTypeChange('weaknesses', type)}
                className={`px-2.5 py-1 text-xs font-bold rounded-full border transition-all ${
                    isActive
                    ? `${colorClass} ring-2 ring-offset-2 ring-zinc-400 dark:ring-zinc-600`
                    : "bg-zinc-50 border-zinc-200 text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-500"
                }`}
                >
                {type}
                </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Resistant */}
      <FilterSection title="Resistant" isOpen={openSections['resistant']} onToggle={() => toggleSection('resistant')}>
        <div className="flex flex-wrap gap-1.5">
          {POKEMON_TYPES.map((type) => {
            const isActive = filters.resistant.includes(type);
            const colorClass = getTypeColor(type);
            
            return (
                <button
                key={type}
                onClick={() => handleTypeChange('resistant', type)}
                className={`px-2.5 py-1 text-xs font-bold rounded-full border transition-all ${
                    isActive
                    ? `${colorClass} ring-2 ring-offset-2 ring-zinc-400 dark:ring-zinc-600`
                    : "bg-zinc-50 border-zinc-200 text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-500"
                }`}
                >
                {type}
                </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Stats */}
      <FilterSection title="Advanced Stats" isOpen={openSections['stats']} onToggle={() => toggleSection('stats')}>
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-xs font-medium mb-1 text-zinc-500">Min CP</label>
            <input
                name="minCP"
                type="number"
                placeholder="0"
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm transition-colors focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                value={filters.minCP}
                onChange={handleChange}
            />
            </div>
            <div>
            <label className="block text-xs font-medium mb-1 text-zinc-500">Min HP</label>
            <input
                name="minHP"
                type="number"
                placeholder="0"
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm transition-colors focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                value={filters.minHP}
                onChange={handleChange}
            />
            </div>
            <div>
            <label className="block text-xs font-medium mb-1 text-zinc-500">Min Height (m)</label>
            <input
                name="minHeight"
                type="number"
                placeholder="0"
                step="0.1"
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm transition-colors focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                value={filters.minHeight}
                onChange={handleChange}
            />
            </div>
            <div>
            <label className="block text-xs font-medium mb-1 text-zinc-500">Min Weight (kg)</label>
            <input
                name="minWeight"
                type="number"
                placeholder="0"
                step="0.1"
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm transition-colors focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                value={filters.minWeight}
                onChange={handleChange}
            />
            </div>
        </div>
      </FilterSection>

    </div>
  );
}
