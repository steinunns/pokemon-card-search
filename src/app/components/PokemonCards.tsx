import Image from "next/image";
import type { PokemonCardModel } from "../types";
import styles from "./PokemonCard.module.css";

// Define base dimensions for the Pokémon card images
const BASE_WIDTH = 245;
const BASE_HEIGHT = 342;

// Define the component's props structure
interface PokemonCardProp {
  card: PokemonCardModel; // A single Pokémon card object
  variant: "small" | "large"; // Determines the image size
}

export const PokemonCard = ({ card, variant }: PokemonCardProp) => {
  // Determine which image size to use based on the variant
  const imageSrc = variant === "small" ? card.images.small : card.images.large;
  const width = variant === "small" ? BASE_WIDTH : BASE_WIDTH * 2;
  const height = variant === "small" ? BASE_HEIGHT : BASE_HEIGHT * 2;

  return (
    <Image
      className={styles.container}
      alt={`${card.name} Pokémon Card`} // Improved accessibility with meaningful alt text
      src={imageSrc}
      width={width}
      height={height}
    />
  );
};
