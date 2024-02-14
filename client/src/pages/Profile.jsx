import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_USER } from "../utils/mutations";
import { GET_OWN_PROFILE } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";

import Auth from "../utils/auth";

const Profile = (props) => {
  if (!Auth.loggedIn()) {
    return (
      <div>
        <p>You must be logged in to view this page.</p>
        <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
      </div>
    );
  }
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    pokemon: "",

    heldItem: "",
    berry: "",
    bio: "",
    profilePic: "",
  });
  const { data: profileData, loading } = useQuery(GET_OWN_PROFILE);
  useEffect(() => {
    if (!loading && profileData) {
      setFormState({
        firstName: profileData.getOwnProfile.firstName,
        lastName: profileData.getOwnProfile.lastName,
        pokemon: profileData.getOwnProfile.pokemon.name,
        matches: profileData.getOwnProfile.matches,
        heldItem: profileData.getOwnProfile.heldItem,
        berry: profileData.getOwnProfile.berry,
        bio: profileData.getOwnProfile.bio,
      });
    }
  }, [loading, profileData]);

  // pokemon stuff

  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => setPokemon(data.results));
  }, []);

  const [berry, setBerry] = useState([]);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/berry")
      .then((response) => response.json())
      .then((data) => setBerry(data.results));
  }, []);

  function formatName(string) {
    let formattedString = string.charAt(0).toUpperCase() + string.slice(1);
    formattedString = formattedString.replace(/-/g, " ");
    return formattedString;
  }

  const [editUser, { error, data }] = useMutation(EDIT_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log(value);

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await editUser({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      firstName: profileData.getOwnProfile.firstName,
      lastName: profileData.getOwnProfile.lastName,
      matches: profileData.getOwnProfile.matches,
      pokemon: profileData.getOwnProfile.pokemon.name,
      heldItem: profileData.getOwnProfile.heldItem,
      berry: profileData.getOwnProfile.berry,
      bio: profileData.getOwnProfile.bio,
    });
  };

  return (
    <main className="flex-row justify-center my-4 ">
      <div className="col-12 col-lg-10">
        <div className="card" style={{ borderColor: "white" }}>
          <h4>
            {" "}
            <div className="card-header bg-white text-dark p-2">Profile {}</div>
          </h4>

          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label
                  htmlFor="firstName"
                  style={{ display: "block", marginBottom: "1rem" }}
                >
                  Enter a First Name!
                </label>
                <input
                  className="form-input"
                  placeholder="Your First Name"
                  name="firstName"
                  type="text"
                  value={formState.firstName}
                  onChange={handleChange}
                  style={{ display: "block", marginBottom: "1rem" }}
                />
                <label
                  htmlFor="lastName"
                  style={{ display: "block", marginBottom: "1rem" }}
                >
                  Enter a Last Name!
                </label>
                <input
                  className="form-input"
                  placeholder="Your Last Name"
                  name="lastName"
                  type="text"
                  value={formState.lastName}
                  onChange={handleChange}
                  style={{ display: "block", marginBottom: "1rem" }}
                />
                <label htmlFor="dropdown">Search for a Pokemon!</label>
                <select
                  className="form-control"
                  id="pokemondropdown"
                  name="pokemon"
                  type="text"
                  style={{ width: "50%" }}
                  onChange={handleChange}
                >
                  {pokemon.map((item, index) => (
                    <option key={index} value={item.name}>
                      {formatName(item.name)}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="heldItem"
                  style={{ display: "block", marginBottom: "1rem" }}
                >
                  And your Held Item!
                </label>
                <input
                  className="form-input"
                  placeholder="Your Held Item"
                  name="heldItem"
                  type="text"
                  value={formState.heldItem}
                  onChange={handleChange}
                  style={{ display: "block", marginBottom: "1rem" }}
                />
                <label
                  htmlFor="berry"
                  style={{ display: "block", marginBottom: "1rem" }}
                >
                  Now for your Berry!
                </label>
                <select
                  className="form-control"
                  id="berrydropdown"
                  name="berry"
                  type="text"
                  style={{ width: "50%" }}
                  onChange={handleChange}
                >
                  {berry.map((berry, index) => (
                    <option key={index} value={berry.name}>
                      {formatName(berry.name)}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="bio"
                  style={{ display: "block", marginBottom: "1rem" }}
                >
                  Please create a Bio!
                </label>
                <input
                  className="form-input"
                  placeholder="Your bio"
                  name="bio"
                  type="text"
                  value={formState.bio}
                  onChange={handleChange}
                  style={{
                    display: "block",
                    marginBottom: "1rem",
                    width: "100%",
                    maxWidth: "25vw",
                    height: "8rem",
                    wordWrap: "break-word",
                  }}
                />
                {/* <label
                  htmlFor="ProfilePic"
                  style={{ display: "block", marginBottom: "1rem" }}
                >
                  Select a profile picture!
                </label>
                <input
                  className="form-input"
                  placeholder="Profile Picture"
                  name="profilePic"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormState((prevState) => ({
                        ...prevState,
                        profilePic: file,
                      }));
                    }
                  }}
                  style={{ display: "block", marginBottom: "1rem" }}
                /> */}
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Profile;
