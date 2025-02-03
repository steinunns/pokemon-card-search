export interface PokemonCardModel {
  id: string;
  images: { small: string; large: string };
  name: string;
  level: string;
  hp: string;
  types: string[];
  flavorText: string;
  artist: string;
  rarity: string;
  number: string;
  set: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    ptcgoCode: string;
    releaseDate: string;
    updataedAt: string;
    images: { symbol: string; logo: string };
  };
}
