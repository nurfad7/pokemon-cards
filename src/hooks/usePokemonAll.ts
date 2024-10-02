import { useState, useEffect } from 'react';
import usePokemonList from "./usePokemonList";
import usePokemonDetails from "./usePokemonDetail";
import { LOCAL_STORAGE_KEY } from '../constants/Names';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  id: number;
  health: number;
  attack: number;
  defense: number;
  spriteFront: string;
  artworkFront: string;
  type: string;
}

const usePokemonAll = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [pokemonDetails, setPokemonDetails] = useState<(PokemonDetails | null)[]>([]);

  const pokemonListFetch = usePokemonList();

  useEffect(() => {
    setIsLoading(pokemonListFetch.loading);
    if(pokemonListFetch.pokemonList.length > 1320){
      setError(pokemonListFetch.error);
    }
  }, [pokemonListFetch.loading]);

  if (!error) {
    pokemonListFetch.pokemonList.map((pokemon) => {
      /*let pokemonDetail = usePokemonDetails(pokemon.name);
      if(pokemonDetail.pokemonDetails != null) {
        setError(pokemonDetail.error);
        setPokemonDetails(prev => [...prev, pokemonDetail.pokemonDetails]);
      }*/
    });
    setIsLoadingDetail(false);
  }

  /*useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pokemonDetails));
  }, [isLoadingDetail]);*/

  return {
    pokemonDetails, 
    loading : isLoading || isLoadingDetail, 
    error
  };
}

export default usePokemonAll;