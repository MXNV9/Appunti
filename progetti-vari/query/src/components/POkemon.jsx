import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export const POkemon = () => {
  const fetchPokemon = async (pokemonInserito) => {
    try {
      const result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonInserito}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPokemonList = async ({ queryKey }) => {
    const [_key, limit] = queryKey;
    const result = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );
    return result.data;
  };

  const pokemon = "charizard"

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["pokemon", pokemon],
    queryFn: () => fetchPokemon(pokemon),
  });

  const data2 = useQuery({
    queryKey: ["pokemonList", 10],
    queryFn: fetchPokemonList,
  });

  if (isPending || data2.isPending) return <p>Loading...</p>;
  if (isError || data2.isError) return <p>Errore nella query!</p>;

  return (
    <>
      <div>
        <p>{data.name}</p>
        <div>
          {data.abilities.map((item, key) => (
            <p key={key}> {item.ability.name} </p>
          ))}
        </div>

        <h3>Lista Pokémon:</h3>
        <ul>
          {data2.data?.results?.map((pokemon, index) => (
            <li key={index}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
