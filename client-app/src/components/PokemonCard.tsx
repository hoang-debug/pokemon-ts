import React, { useEffect, useState } from "react";
import { Details, moreDetail, pokemonDetail } from "../interface";
import "./pokemon.css";

interface Props {
  viewDetails: Details;
  setViewDetails: React.Dispatch<React.SetStateAction<Details>>;
  name: string;
  id: number;
  image: string;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
}
const PokemonCard: React.FC<Props> = (props) => {
  const { name, id, image, abilities, viewDetails, setViewDetails } = props;
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    setSelected(id === viewDetails?.id);
  }, [viewDetails]);
  const closeDetail =()=>{
    setViewDetails({
      id:0,
      isOpened: false,
    })
  }
  return (
    <div className="">
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}>X</p>
            <div className="detail-info">
              <img src={image} alt={name} className="detail-img" />
              <p className="detail-name">{name}</p>
            </div>
            <div className="detai-skill">
              <p className="detail-ability">Abilities:</p>
              {abilities?.map((a: any) => {
                return <div>{a.ability.name}</div>;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={image} alt={name} />
        </section>
      )}
    </div>
  );
};

export default PokemonCard;
