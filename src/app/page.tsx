// Import styles and necessary components/types
import styles from "./page.module.css";
import type { PokemonCardModel } from "./types";
import { PokemonCardList } from "./components/PokemonCardList";
import { API_BASE_URL } from "./constants";
import Link from "next/link";
import { SearchSection } from "./components/SearchSection/SearchSection";

// Define how many Pokémon cards to fetch per request
const PAGE_SIZE = 12;

// Define the expected response structure from the API
interface PokemonCardListResponse {
  count: number; // Total number of results in the API
  data: PokemonCardModel[]; // Array of Pokémon cards
  page: number; // Current page number
  pageSize: number; // Number of items per page
  totalCount: number; // Total number of Pokémon cards available
}

// ✅ Fix `searchParams` type (it's an object, not a Promise)
interface PokemonCardListPageProps {
  searchParams: {
    page?: string;
    name?: string;
  };
}

// Next.js uses async functions for server-side fetching
export default async function PokemonCardListPage({
  searchParams,
}: PokemonCardListPageProps) {
  // ✅ Remove `await` from searchParams
  const { page = "1", name = "" } = searchParams;
  const currentPage = Number(page);

  try {
    // Debugging: Check if API_BASE_URL is correct
    console.log("🔍 Fetching from:", API_BASE_URL);

    // Fetch Pokémon card data from the API with the correct query parameter
    const response = await fetch(
      `${API_BASE_URL}?pageSize=${PAGE_SIZE}&page=${currentPage}&q=name:*${name}*`,
      {
        cache: "no-store", // Ensures fresh data is fetched every time
      }
    );

    // Check if the API response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon cards: ${response.statusText}`);
    }

    // Parse the JSON response
    const json: PokemonCardListResponse = await response.json();

    // Get the total number of pages
    const totalPages = Math.ceil(json.totalCount / PAGE_SIZE);

    return (
      <>
        <div className={styles.paginationContainer}>
          <SearchSection />
        </div>

        {/* Main container wrapping the card list */}
        <div className={styles.container}>
          {/* Render the list of Pokémon cards */}
          <PokemonCardList cards={json.data} />
        </div>

        {/* Pagination container appears below the card list */}
        <div className={styles.paginationContainer}>
          {/* Previous Page Button */}
          {currentPage > 1 && (
            <Link href={`/?page=${currentPage - 1}`}>Previous</Link>
          )}

          {/* Page Number Display */}
          <span>
            Page {currentPage} of {totalPages}
          </span>

          {/* Next Page Button */}
          {currentPage < totalPages && (
            <Link href={`/?page=${currentPage + 1}`}>Next</Link>
          )}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching Pokémon cards:", error);
    return <p className={styles.error}>Failed to load Pokémon cards.</p>;
  }
}
