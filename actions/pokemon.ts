import { Pokemon, PokemonQueryResponse } from "@/types/Pokemon";
import createApolloClient from "@/libs/apollo";
import { GET_POKEMONS_LIST, GET_POKEMON_DETAILS } from "@/graphql/queries";
import { POKEMON_GEN1_LIMIT, CACHE_REVALIDATE_SECONDS } from "@/constants/config";

export async function getPokemonList(first: number = POKEMON_GEN1_LIMIT): Promise<Pokemon[]> {
  const client = createApolloClient();
  try {
    const { data } = await client.query<PokemonQueryResponse>({
      query: GET_POKEMONS_LIST,
      variables: { first },
      context: {
        fetchOptions: {
          next: { revalidate: CACHE_REVALIDATE_SECONDS },
        },
      },
    });

    return data?.pokemons || [];
  } catch (error) {
    console.error("getPokemonList error:", error);
    return [];
  }
}

export async function getPokemonByName(name: string): Promise<Pokemon | null> {
  const client = createApolloClient();
  try {
    const { data } = await client.query<PokemonQueryResponse>({
      query: GET_POKEMON_DETAILS,
      variables: { name },
      context: {
        fetchOptions: {
          next: { revalidate: CACHE_REVALIDATE_SECONDS },
        },
      },
    });

    return data?.pokemon || null;
  } catch (error) {
    console.error("getPokemonByName error:", error);
    return null;
  }
}
