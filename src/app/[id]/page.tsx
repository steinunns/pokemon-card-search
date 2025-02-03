console.log("🔍 Server-side log: Pokemon card page loaded");

import { PokemonCard } from "@/app/components/PokemonCards";
import { API_BASE_URL } from "@/app/constants";
import type { PokemonCardModel } from "@/app/types";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

// Define API response type
interface PokemonCardDetailsResponse {
  data: PokemonCardModel;
}

// Define props type correctly (params is NOT a promise)
interface PokemonCardDetailsPageProps {
  params: { id: string };
}

// Next.js dynamic page fetching based on the `id` param
export default async function PokemonCardDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // ✅ Explicitly declare type in function signature
  const { id } = params;

  // Check if id exists before making the request
  if (!id) {
    return <p className={styles.error}>Invalid Pokémon ID.</p>;
  }

  // Debugging: Check if API_BASE_URL is defined
  console.log("Fetching from:", API_BASE_URL);

  try {
    // Fetch Pokémon card details from the API
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      cache: "no-store",
    });

    // Debugging: Check the response status
    console.log("API Response Status:", response.status);

    // Handle API response errors
    if (response.status === 404) {
      notFound();
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon card: ${response.statusText}`);
    }

    // Parse the JSON response
    const json: PokemonCardDetailsResponse = await response.json();

    // Debugging: Check if data is received
    console.log("Fetched Data:", json);

    // Ensure `data` exists before using it
    if (!json.data) {
      throw new Error("Invalid response: No Pokémon card data found.");
    }

    const card = json.data;

    return (
      <div className={styles.container}>
        {/* Display the Pokémon card image */}
        <PokemonCard card={card} variant="large" />

        {/* Card details */}
        <div>
          <h1>{card.name}</h1>
          <p>{card.flavorText}</p>
        </div>

        {/* Artist */}
        <div>
          <h2>Artist:</h2>
          <p>{card.artist}</p>
        </div>

        {/* Rarity */}
        <div>
          <h2>Rarity:</h2>
          <p>{card.rarity}</p>
        </div>

        {/* Stats section */}
        <div className={styles.statsContainer}>
          <h2>Stats</h2>
          {card.hp && (
            <div>
              <h3>HP</h3>
              <p>{card.hp}</p>
            </div>
          )}
          {card.level && (
            <div>
              <h3>Level</h3>
              <p>{card.level}</p>
            </div>
          )}
        </div>

        {/* Set information */}
        <div className={styles.statsContainer}>
          <h2>Set</h2>
          {card.set?.images?.symbol && (
            <Image
              alt={`${card.set.name} set symbol`}
              src={card.set.images.symbol}
              width={64}
              height={64}
            />
          )}
          <div>
            <h3>Name</h3>
            <p>{card.set.name}</p>
          </div>
          <div>
            <h3>Release Date</h3>
            <p>{card.set.releaseDate}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching Pokémon card:", error);
    return <p className={styles.error}>Failed to load Pokémon card details.</p>;
  }
}
