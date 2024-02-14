import { useQuery, useReadQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_OWN_PROFILE } from "../utils/queries";
import { Link } from "react-router-dom";
import pokeBallC from "../images/pokeballz_closed.png";
import pokeBallO from "../images/pokeballz_open.png";

const Home = () => {
  const { loading, error, data } = useQuery(GET_OWN_PROFILE);
  if (loading) return <p>loading</p>;
  if (error) return <p>Error </p>;
  if (!Auth.loggedIn()) {
    return (
      <div style={{ height: "75vh", position: "relative" }}>
        <div
          className="ballCircle"
          style={{ position: "absolute", top: "-45px" }}
        ></div>
        <li>
          <a href="/signup">Signup</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </div>
    );
  } else {
    const userName = data.getOwnProfile && data.getOwnProfile.userName;
    return (
      <main className="col-9 my-4">
        <div
          className="card"
          style={{ borderColor: "white", fontSize: "50px" }}
        >
          <p>Welcome , {userName}!</p>
          <Link to="/search">
            <div className="pokeball-container">
              <img src={pokeBallC} className="pokeball-front"></img>
              <img src={pokeBallO} className="pokeball-back"></img>
            </div>
          </Link>
        </div>
      </main>
    );
  }
};
export default Home;
