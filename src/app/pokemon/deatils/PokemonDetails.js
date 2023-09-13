"use client";

import React, { useState, useEffect } from "react";

export default function PokemonDetails({ name }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const pokemonData = await pokemonResponse.json();
      setPokemonData(pokemonData);

      const speciesResponse = await fetch(pokemonData.species.url);
      const speciesData = await speciesResponse.json();
      const evolutionChainResponse = await fetch(
        speciesData.evolution_chain.url
      );
      const evolutionChainData = await evolutionChainResponse.json();
      setEvolutionChain(evolutionChainData);
    }

    fetchData();
  }, [name]);

  if (!pokemonData || !evolutionChain) {
    return <div>Loading...</div>;
  }

  const imageUrl = pokemonData.sprites.front_default;
  const pokeName = pokemonData.name;
  const moves = pokemonData.moves.map((move) => move.move.name).join(", ");
  const region = pokemonData.location_area_encounters.split("/")[4];
  const evolutions = [];

  let currentEvolution = evolutionChain.chain;
  while (currentEvolution) {
    evolutions.push(currentEvolution.species.pokeName);
    currentEvolution = currentEvolution.evolves_to[0];
  }

  return (
    <div>
      <img src={imageUrl} alt={pokeName} />
      <h2>{pokeName}</h2>
      <p>Moves: {moves}</p>
      <p>Region: {region}</p>
      <p>Evolutions: {evolutions.join(" -> ")}</p>
    </div>
  );
}
