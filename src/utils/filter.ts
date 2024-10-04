import { Pokemon, PokemonDetail } from "../types/pokemonDetail";

export const filterPokemon = (pokemons: Pokemon[], filter: string): Pokemon[] => {
  const regex = new RegExp(filter, 'i');
  pokemons = pokemons.filter(pokemon => regex.test(pokemon.name));
  return pokemons;
}

export const sortPokemon = (pokemons: Pokemon[], filter: string): Pokemon[] => {
  switch (filter) {
    case "name" :
      {pokemons = pokemons.sort((a, b) => 
            a.name.localeCompare(b.name))}
      break;
    case "type" :
      {
        pokemons = pokemons.sort((a, b) => (
          getStringSort(a, filter).localeCompare(getStringSort(b, filter))
        ))
      }
      break;
    case "hp" :
      {
        pokemons = pokemons.sort((a, b) => (getNumberSort(b, filter) - (getNumberSort(a, filter))))
      }
      break;
    default:
      break;
  }
  return pokemons;
}

const getStringSort = (pokemon: Pokemon, typeSort: string) => {
  const storedData = localStorage.getItem(pokemon.name);
  let pokemonDetail = null;
  if (storedData) {
    pokemonDetail =JSON.parse(storedData)
  }
  
  return getStringType(pokemonDetail, typeSort);
}

const getStringType = (detail: PokemonDetail | null, typeSort: string): string => {
  if(detail !== null) {
    switch (typeSort) {
      case "type" : return detail.type;
      default: return "";
    }
  } else {
    return "";
  }
}

const getNumberSort = (pokemon: Pokemon, typeSort: string): number => {
  const storedData = localStorage.getItem(pokemon.name);
  let pokemonDetail = null;
  if (storedData) {
    pokemonDetail = JSON.parse(storedData);
  }
  
  return getNumberType(pokemonDetail, typeSort);
}

const getNumberType = (detail: PokemonDetail | null, typeSort: string): number => {
  if(detail !== null) {
    switch (typeSort) {
      case "name" : return detail.health;
      default: return 0;
    }
  } else {
    return 0;
  }
}