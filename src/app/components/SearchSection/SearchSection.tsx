"use client"; // Ensures this component runs on the client side (required for useState and useRouter)

// Import Next.js components and hooks
import Link from "next/link"; // Used for navigation via clickable links
import { useState } from "react"; // React hook for managing component state
import { useRouter } from "next/navigation"; // Next.js hook for programmatic navigation

// Define the SearchSection component
export const SearchSection = () => {
  // useState to store the user's search input
  const [name, setName] = useState("");

  // useRouter allows us to navigate programmatically
  const router = useRouter();

  return (
    <div>
      {/* Input field for entering the Pokémon name */}
      <input
        value={name} // The value of the input is controlled by the "name" state
        onChange={(event) => setName(event.target.value)} // Updates state when user types
        onKeyDown={(event) => {
          // Checks if the "Enter" key is pressed
          if (event.key === "Enter") {
            router.push(`/?name=${name}`); // Navigates to the search results page with the query parameter
          }
        }}
        placeholder="Enter Pokémon name" // Placeholder text inside the input field
      />

      {/* Conditional rendering: If "name" is not empty, show a clickable search link */}
      {name.trim() ? (
        <Link href={`/?name=${name}`}>Search</Link>
      ) : (
        // If "name" is empty, show a disabled search text instead of a clickable link
        <span>Search</span>
      )}
    </div>
  );
};
