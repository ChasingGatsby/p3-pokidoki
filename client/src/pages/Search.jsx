import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_PROFILES_BY_POKEMON,
  GET_PROFILES_BY_TYPE,
} from "../utils/queries";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

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
    getProfilesByPokemon({ variables: { name: selectedItem } }).then((res) =>
      console.log(res)
    );
    setActiveQuery("pokemon");
  };

  const handleTypeSearch = () => {
    getProfilesByType({ variables: { type: selectedType } }).then((res) =>
      console.log(res)
    );
    console.log({ variables: { type: selectedType } });
    setActiveQuery("type");
  };

  if (!Auth.loggedIn()) {
    return (
      <div>
        <p>You must be logged in to view this page.</p>
        <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
      </div>
    );
  }

  return (
    <div className="container m-5">
      <div className="row">
        <div className="col">
          <form className="form-inline">
            <label htmlFor="dropdown">Search for a Pokemon!</label>
            <div className="form-group my-3 d-flex align-items-center">
              <select
                className="form-control mx-2"
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
              <button
                type="button"
                className="btn btn-danger"
                onClick={handlePokemonSearch}
              >
                Search
              </button>
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
        </div>

        <div className="col">
          <form className="form-inline">
            <label htmlFor="dropdown" className="mr-2">
              Search for a Type!
            </label>
            <div className="form-group d-flex align=items-center my-3">
              <select
                className="form-control mx-2"
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
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleTypeSearch}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container mt-5">
        {activeQuery === "pokemon" && loading && <p>Loading...</p>}
        {activeQuery === "pokemon" && error && <p>Error : {error.message}</p>}
        {activeQuery === "type" && loadingType && <p>Loading...</p>}
        {activeQuery === "type" && errorType && (
          <p>Error : {errorType.message}</p>
        )}
        {activeQuery === "pokemon" &&
          !loading &&
          !error &&
          data.getProfilesByPokemon.length === 0 && <label>No results found</label>}
        {activeQuery === "type" &&
          !loadingType &&
          !errorType &&
          dataType.getProfilesByType.length === 0 && <label>No results found</label>}
        <div className="row">
          {activeQuery === "pokemon" &&
            data &&
            data.getProfilesByPokemon.length > 0 &&
            data.getProfilesByPokemon.map((profile) => (
              <div className="col-md-4">
                <SearchResult
                  key={profile._id}
                  id={profile._id}
                  name={profile.firstName}
                  pokemon={profile.pokemon.name}
                  image={profile.pokemon.image}
                />
              </div>
            ))}
          {activeQuery === "type" &&
            dataType &&
            dataType.getProfilesByType.length > 0 &&
            dataType.getProfilesByType.map((profile) => (
              <div className="col-md-4">
                <SearchResult
                  key={profile._id}
                  id={profile._id}
                  name={profile.firstName}
                  pokemon={profile.pokemon.name}
                  image={profile.pokemon.image}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
