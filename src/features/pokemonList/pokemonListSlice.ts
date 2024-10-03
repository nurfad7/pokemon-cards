import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import { Pokemon } from "../../types/pokemonDetail"
import { LOCAL_STORAGE_KEY } from "../../constants/Names";

export const fetchList = createAsyncThunk("pokemon/fetchList", async () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedData && storedData.length > 0) {
    const parsedData = JSON.parse(storedData) as Pokemon[];
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