import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import { Pokemon, Filter, PokemonDetail } from "../../types/pokemonDetail"
import { 
  LOCAL_STORAGE_KEY, 
  STATUS_STORAGE_KEY 
} from "../../constants/Names";
import { filterPokemon, sortPokemon } from "../../utils/filter";

export const fetchList = createAsyncThunk("pokemon/fetchList", 
      async (filter: Filter, {rejectWithValue}) => {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedStatus = localStorage.getItem(STATUS_STORAGE_KEY);
    if (storedData && storedData.length > 0) {
      let parsedData = JSON.parse(storedData) as Pokemon[];
      if (filter.sortBy && !storedStatus) {
        parsedData.map(async (value) => {
          const storedDetail = localStorage.getItem(value.name);
          if(!storedDetail) {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value.name}`);
            const parsedDetail: PokemonDetail = {
              name: data.name,
              id: data.id,
              health: data.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
              attack: data.stats.find((stat: any) => stat.stat.name === 'attack').base_stat,
              defense: data.stats.find((stat: any) => stat.stat.name === 'defense').base_stat,
              spriteFront: data.sprites.front_default,
              artworkFront: data.sprites.other['official-artwork'].front_default,
              type: data.types.length > 0 ? data.types[0].type.name : "",
            };
    
            if (!parsedDetail?.name) {
              throw new Error('Fetch all failed');
            }
    
            localStorage.setItem(value.name, JSON.stringify(parsedDetail));
          }
        });
        localStorage.setItem(STATUS_STORAGE_KEY, "All");
      }
      if (filter.name) parsedData = filterPokemon(parsedData, filter.name)
      if (filter.sortBy) parsedData = sortPokemon(parsedData, filter.sortBy)
      return parsedData.slice(0, 20)
    } else {
      const { data, status } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302');
      if (status !== 200) {
        throw new Error("Failed to fetch pokemon list");
      }
      const parsedData: Pokemon[] = data.results;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedData));
      return parsedData.slice(0, 20);
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

interface PokemonListState {
  pokemons: Pokemon[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: PokemonListState = {
  pokemons: [],
  status: "idle",
  error: null,
};

const pokemonListSlice = createSlice({
  name: "pokemon list",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PokemonListState>) => {
    builder.addCase(fetchList.pending, (state) => {
      state.status = "loading";
    }).addCase(fetchList.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.pokemons = action.payload;
    }).addCase(fetchList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  }
});

export default pokemonListSlice.reducer;