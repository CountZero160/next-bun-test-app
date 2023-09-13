"use client";

import PokemonDetails from "./PokemonDetails";

export default function Page() {
  return (
    <div className="pokelist">
      <PokemonDetails name={name} />
    </div>
  );
}
