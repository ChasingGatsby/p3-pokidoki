import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_PROFILES_BY_POKEMON,
  GET_PROFILES_BY_TYPE,
} from "../utils/queries";

import SearchResult from "../components/SearchResult";

export default function Search() {
  const [getProfilesByPokemon, { loading, error, data }] = useLazyQuery(
    GET_PROFILES_BY_POKEMON
  );
  const [
    getProfilesByType,
    { loading: loadingType, error: errorType, data: dataType },
  ] = useLazyQuery(GET_PROFILES_BY_TYPE);

  const [pokemon, setPokemon] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const [activeQuery, setActiveQuery] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => setPokemon(data.results));
  }, []);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type/")
      .then((response) => response.json())
      .then((data) => setType(data.results));
  }, []);

  function formatName(string) {
    let formattedString = string.charAt(0).toUpperCase() + string.slice(1);
    formattedString = formattedString.replace(/-/g, " ");
    return formattedString;
  }

  const handleChange = (event) => {
    // Add this function
    setSelectedItem(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handlePokemonSearch = () => {
    getProfilesByPokemon({ variables: { name: selectedItem } }).then((res)=>(console.log(res)));
    console.log({variables: { name}});
    setActiveQuery("pokemon");
  };

  const handleTypeSearch = () => {
    getProfilesByType({ variables: { type: selectedType } });
    setActiveQuery("type");
  };

  return (
    <div className="container m-5">
      <div className="row">
        <div className="col">
          <form>
            <div className="form-group my-3">
              <label htmlFor="dropdown">Search for a Pokemon!</label>
              <select
                className="form-control"
                id="pokemondropdown"
                style={{ width: "50%" }}
                onChange={handleChange}
              >
                {pokemon.map((item, index) => (
                  <option key={index} value={item.name}>
                    {formatName(item.name)}
                  </option>
                ))}
              </select>
            </div>
          </form>

          {selectedItem && (
            <img
              src={`https://img.pokemondb.net/artwork/large/${selectedItem}.jpg`}
              style={{ width: "200px", height: "200px" }}
              className="img-thumbnail"
              alt={selectedItem}
            />
          )}
          {/* Add this line to display the selected item */}
          <button
            type="button"
            className="btn btn-danger"
            onClick={handlePokemonSearch}
          >
            Search
          </button>
        </div>

        <div className="col">
          <form>
            <div className="form-group my-3">
              <label htmlFor="dropdown">Search for a Type!</label>
              <select
                className="form-control"
                id="typedropdown"
                style={{ width: "50%" }}
                onChange={handleTypeChange}
              >
                {type.map((item, index) => (
                  <option key={index} value={item.name}>
                    {formatName(item.name)}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleTypeSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="container">
        {loading && <p>Loading...</p>}
        {error && <p>Error : {error.message}</p>}
        {loadingType && <p>Loading...</p>}
        {errorType && <p>Error : {errorType.message}</p>}
        {activeQuery === "pokemon" &&
          data &&
          data.getProfilesByPokemon.length > 0 &&
          data.getProfilesByPokemon.map((profile) => (
            <SearchResult
              key={profile._id}
              name={profile.firstName}
              pokemon={profile.pokemon.name}
              image={profile.pokemon.image}
            />
          ))}
        {activeQuery === "type" &&
          dataType &&
          dataType.getProfilesByType.length > 0 &&
          dataType.getProfilesByType.map((profile) => (
            <SearchResult
              key={profile._id}
              name={profile.firstName}
              pokemon={profile.pokemon.name}
              image={profile.pokemon.image}
            />
          ))}
      </div>
    </div>
  );
}
