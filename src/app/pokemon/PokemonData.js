"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

function PokemonCard({ pokemon }) {
  return (
    <div
      id="card"
      class="flex flex-col items-center justify-center text-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 hover:bg-sky-800"
    >
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
    </div>
  );
}

export default function PokemonData() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      setPokemonData(
        data.results.map((pokemon, index) => ({
          ...pokemon,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        }))
      );
    }
    fetchData();
  }, []);

  return (
    <div
      id="pokemonlist"
      class="grid gap-2 p-2 mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-4"
    >
      {console.log(pokemonData)}
      {pokemonData.map((pokemon) => (
        <Link key={pokemon.name} href={`/pokemon/details/${pokemon.name}`}>
          {console.log(pokemon)}
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        </Link>
      ))}
    </div>
  );
}
