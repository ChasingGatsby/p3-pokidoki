import { useQuery, useReadQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_OWN_PROFILE } from "../utils/queries";
import { GET_OTHER_PROFILE, GET_MATCHES } from "../utils/queries";
import MatchCard from "../components/MatchCard";
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
        {" "}
        <h2>My Matches: </h2>{" "}
        <div>
          <p>Welcome, {userData.firstName}!</p>
          <div>
            {userMatches.map((match) => (
              <MatchCard
                firstName={match.firstName}
                lastName={match.lastName}
                userName={match.userName}
                id={match._id}
                pokemon={match.pokemon}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }
};
export default Matches;
