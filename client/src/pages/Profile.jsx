import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_USER } from "../utils/mutations";
import { GET_PROFILE } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = (props) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    pokemon: "",

    heldItem: "",
    berry: "",
    bio: "",
    profilePic: "",
  });
  const [editUser, { error, data }] = useMutation(EDIT_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    console.log();
    try {
      const { data } = await editUser({
        variables: { ...formState },
      });

      Auth.editUser(data.editUser.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      firstName: "",
      lastName: "",
      pokemon: "",
      heldItem: "",
      berry: "",
      bio: "",
      profilePic: null,
    });
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
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4>
            {" "}
            <div className="card-header bg-dark text-light p-2">Profile {}</div>
            <div>
              <img
                src={formState.profilePic}
                alt="Profile Picture"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            </div>
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
                <label
                  htmlFor="pokemon"
                  style={{ display: "block", marginBottom: "1rem" }}
                >
                  Choose your Pokemon!
                </label>
                <input
                  className="form-input"
                  placeholder="Your Pokemon"
                  name="pokemon"
                  type="text"
                  value={formState.pokemon}
                  onChange={handleChange}
                  style={{ display: "block", marginBottom: "1rem" }}
                />
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
                <input
                  className="form-input"
                  placeholder="Berry"
                  name="berry"
                  type="text"
                  value={formState.berry}
                  onChange={handleChange}
                  style={{ display: "block", marginBottom: "1rem" }}
                />
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
                  style={{ display: "block", marginBottom: "1rem" }}
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
