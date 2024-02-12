import { useQuery, useReadQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_PROFILE } from "../utils/queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_PROFILE);
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
  }
  const userEmail = data.getProfile.firstName;
  return (
    <main>
      {" "}
      <div>Just placeholder text </div>{" "}
      <div>
        <p>Welcome, {userEmail}!</p>
      </div>
    </main>
  );
};

export default Home;
