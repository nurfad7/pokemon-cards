import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEY } from '../constants/Names';

interface Pokemon {
  name: string;
  url: string;
}

const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  //const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchPokemonList = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon.');
      }
      const data = await response.json();
      setPokemonList((prevList) => [...prevList, ...data.results]);
      setNextUrl(data.next);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      fetchPokemonList('https://pokeapi.co/api/v2/pokemon?limit=20');
    }
  }, []);

  const fetchNextPokemonList = () => {
    if (nextUrl) {
      fetchPokemonList(nextUrl);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNextPokemonList();
  }, [nextUrl]);

  // Function to filter Pokémon by name substring
  /*const filterPokemon = (searchTerm: string) => {
    return pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Filtered Pokémon list based on the search term
  const filteredPokemon = filterPokemon(searchTerm);*/

  return { pokemonList, loading, error };
};

export default usePokemonList;
