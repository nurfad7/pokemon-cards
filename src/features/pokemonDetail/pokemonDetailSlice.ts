import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import { PokemonDetail } from "../../types/pokemonDetail"

export const fetchDetail = createAsyncThunk("pokemon/fetchDetail", 
        async (pokemonName: string, {rejectWithValue}) => {
  try {
    const storedData = localStorage.getItem(pokemonName);
    if (storedData && storedData.length > 0) {
      const parsedData = JSON.parse(storedData) as PokemonDetail;
      return parsedData;
    } else {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const parsedData: PokemonDetail = {
          name: data.name,
          id: data.id,
          health: data.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
          attack: data.stats.find((stat: any) => stat.stat.name === 'attack').base_stat,
          defense: data.stats.find((stat: any) => stat.stat.name === 'defense').base_stat,
          spriteFront: data.sprites.front_default,
          artworkFront: data.sprites.other['official-artwork'].front_default,
          type: data.types.length > 0 ? data.types[0].type.name : "",
        };

        if (!parsedData?.name) {
          throw new Error('Not found');
        }

        localStorage.setItem(pokemonName, JSON.stringify(parsedData));
        return parsedData;
    }
  } catch (error) {
    return rejectWithValue(error || `Failed to fetch ${pokemonName} detail`);
  }
});

interface PokemonDetailState {
  detail: PokemonDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: PokemonDetailState = {
  detail: null,
  status: "idle",
  error: null,
};

const pokemonDetailSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PokemonDetailState>) => {
    builder.addCase(fetchDetail.pending, (state) => {
      state.status = "loading";
    }).addCase(fetchDetail.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.detail = action.payload;
    }).addCase(fetchDetail.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  }
});

export default pokemonDetailSlice.reducer;