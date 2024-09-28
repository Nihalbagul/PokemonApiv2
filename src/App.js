import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(response => {
        const fetches = response.data.results.map(pokemon =>
          axios.get(pokemon.url).then(res => res.data)
        );
        Promise.all(fetches).then(data => setPokemonData(data));
      })
      .catch(error => console.error(error));
  }, []);

  const filteredPokemon = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="pokemon-container">
        {filteredPokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
