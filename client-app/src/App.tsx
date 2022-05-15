import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./components/PokemonCollection";
import { Details, pokemonDetail } from "./interface";

interface Pokemon {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<pokemonDetail[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetails, setViewDetails] = useState<Details>({
    id: 0,
    isOpened: false
  })
  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextPageUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemon) => {
        const singlePokemon = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, singlePokemon.data]);
        setLoading(false);
      });
    };
    getPokemon()
  }, []);

  const nextPage =async () => {
    setLoading(true);
    let res = await axios.get(nextPageUrl);
    setNextPageUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemon) => {
      const singlePokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, singlePokemon.data]);
      setLoading(false);
    });
  }
  return (
    <div className="App">
      <div className="container">
        <img src="https://i.pinimg.com/originals/fd/18/c6/fd18c6d26d4d9d26a0bd9d1a2fb2bd04.png" alt="PokemonLogo"  style={{height: "7rem"}}/>
        <PokemonCollection pokemons={pokemons} viewDetails={viewDetails} setViewDetails={setViewDetails}/>

        {!viewDetails.isOpened && (
          <div className="btn">
          <button onClick={nextPage}>
          {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
        )}
        
      </div>
    </div>
  );
};

export default App;
