export const getPokemonImage = (number: string | number): string => {
  const id = typeof number === 'string' ? parseInt(number, 10) : number;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};
