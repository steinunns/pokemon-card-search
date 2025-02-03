import Link from "next/link";
import { PokemonCard } from "./PokemonCards";
import type { PokemonCardModel } from "@/app/types";
import styles from "./PokemonCardList.module.css";

interface PokemonCardListProps {
  cards: PokemonCardModel[];
}

export const PokemonCardList = ({ cards }: PokemonCardListProps) => {
  return (
    <div className={styles.container}>
      {cards.map((card) => (
        <Link key={card.id} href={`/${card.id}`}>
          <PokemonCard card={card} variant="small" />
        </Link>
      ))}
    </div>
  );
};
