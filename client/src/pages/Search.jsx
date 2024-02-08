import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

// Define your GraphQL query

export default function Search() {
  // const { loading, error, data } = useQuery(GET_USERS);
  const [pokemon, setPokemon] = useState([]);
  const [selectedItem, setSelectedItem] = useState(""); // Add this line
  const [type, setType] = useState("");

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => setPokemon(data.results));
  }, []);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type/")
      .then((response) => response.json())
      .then((data) => setType(data.results));
  });

  function formatName(string) {
    let formattedString = string.charAt(0).toUpperCase() + string.slice(1);
    formattedString = formattedString.replace(/-/g, " ");
    return formattedString;
  }

  const handleChange = (event) => {
    // Add this function
    setSelectedItem(event.target.value);
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
                id="dropdown"
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
          <button type="button" className="btn btn-danger">
            Search
          </button>
        </div>

        <div className="col">
          <form>
            <div className="form-group my-3">
              <label htmlFor="dropdown">Search for a Type!</label>
              <select
                className="form-control"
                id="dropdown"
                style={{ width: "50%" }}
              >
                {type.map((item, index) => (
                  <option key={index} value={item.name}>
                    {formatName(item.name)}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <button type="button" className="btn btn-danger">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
