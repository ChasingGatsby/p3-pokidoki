import Auth from "../utils/auth";
import { GET_OWN_PROFILE } from "../utils/queries";

const Home = () => {
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
  const { userName } = Auth.getOwnProfile();
  return (
    <main>
      {" "}
      <div>Just placeholder text </div>{" "}
      <div>
        <p>Welcome, {userName}!</p>
      </div>
    </main>
  );
};

export default Home;
