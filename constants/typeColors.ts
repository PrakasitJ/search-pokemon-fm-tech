export const TYPE_COLORS: Record<string, string> = {
  Normal: "bg-zinc-400 text-white",
  Fire: "bg-orange-500 text-white",
  Water: "bg-blue-500 text-white",
  Electric: "bg-yellow-400 text-black",
  Grass: "bg-green-500 text-white",
  Ice: "bg-cyan-400 text-black",
  Fighting: "bg-red-700 text-white",
  Poison: "bg-purple-500 text-white",
  Ground: "bg-amber-600 text-white",
  Flying: "bg-indigo-400 text-white",
  Psychic: "bg-pink-500 text-white",
  Bug: "bg-lime-500 text-white",
  Rock: "bg-stone-500 text-white",
  Ghost: "bg-purple-800 text-white",
  Dragon: "bg-indigo-600 text-white",
  Steel: "bg-slate-400 text-white",
  Fairy: "bg-pink-300 text-black",
  Dark: "bg-zinc-800 text-white",
};

export const getTypeColor = (type: string) => TYPE_COLORS[type] || "bg-zinc-400 text-white";
