export interface pokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface Details {
  id: number;
  isOpened: boolean;
}

export interface moreDetail extends pokemonDetail {
    abilities?: {
        ability : string;
        name: string;
    }[]
}