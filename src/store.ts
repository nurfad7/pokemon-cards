import {configureStore} from "@reduxjs/toolkit";
import pokemonListSlice from "./features/pokemonList/pokemonListSlice";
import pokemonDetailSlice from "./features/pokemonDetail/pokemonDetailSlice";

export const store = configureStore({
  reducer: {
    pokemonList: pokemonListSlice,
    pokemonDetail: pokemonDetailSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;