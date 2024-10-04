export interface PokemonDetail {
  name: string;
  id: number;
  health: number;
  attack: number;
  defense: number;
  spriteFront: string;
  artworkFront: string;
  type: string;
}

export interface Pokemon {
  name: string;
  link: string;
}

export interface Filter {
  name: string;
  sortBy: string;
}