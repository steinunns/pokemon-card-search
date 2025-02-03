import React from "react"; // ✅ Required for TypeScript in Next.js 15+
import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.container}>
      {/* Ensuring better styling and accessibility */}
      <Link href="/">Pokémon Card Search</Link>
    </header>
  );
};
