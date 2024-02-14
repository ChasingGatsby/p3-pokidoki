import { useQuery, useReadQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_OWN_PROFILE } from "../utils/queries";
import { GET_OTHER_PROFILE, GET_MATCHES } from "../utils/queries";
import MatchCard from "../components/MatchCard";
import { Link } from "react-router-dom";
import pokeBallC from "../images/pokeballz_closed.png";
import pokeBallO from "../images/pokeballz_open.png";
const Matches = () => {
  const { loading, error, data } = useQuery(GET_MATCHES);
  if (loading) return <p>loading</p>;
  if (error) return <p>Error </p>;
  if (!Auth.loggedIn()) {
    return (
      <div>
        <p>You must be logged in to view this page.</p>
        <li>
          <a href="/signup">Signup</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </div>
    );
  } else {
    const userData = data.getMatches;
    const userMatches = data.getMatches.matches;
    const userPokemon = userMatches;
    console.log(userData);
    return (
      <main className="col-9">
        <a>My Matches: </a>
        <div>
          <div>
            {userMatches.map((match) => (
              <MatchCard
                firstName={match.firstName}
                lastName={match.lastName}
                userName={match.userName}
                id={match._id}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }
};
export default Matches;
