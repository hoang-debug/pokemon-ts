import React from "react";
import { Details, moreDetail } from "../interface";
import PokemonCard from "./PokemonCard";

interface Props {
  pokemons: moreDetail[];
  viewDetails: Details;
  setViewDetails: React.Dispatch<React.SetStateAction<Details>>
}
const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetails, setViewDetails } = props;
  const selectPokemon = (id: number) =>{
      if(!viewDetails.isOpened){
        setViewDetails({
            id: id,
            isOpened: true,
        })
      }
    
  }
  return (
      <>
          <section className={viewDetails.isOpened ? 'collection-container-active' : 'collection-container'}>
              {viewDetails.isOpened ? (
                  <div className="overlay"></div>
              ) : (<div></div>)}
              {pokemons.map((p) => {
                  return (
                      <div onClick={() =>{selectPokemon(p.id)}}>
                          <PokemonCard 
                          viewDetails={viewDetails}
                          setViewDetails={setViewDetails}
                          key={p.id}
                          name={p.name}
                          id={p.id}
                          image={p.sprites.front_default}
                          abilities={p.abilities}
                          />
                      </div>
                  )
              })}
          </section>
      </>
  )
};

export default PokemonCollection;
