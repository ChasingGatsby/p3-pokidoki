import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Settings = () => {
  if (!Auth.loggedIn()) {
    return (
      <div>
        <p>You must be logged in to view this page.</p>
        <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
      </div>
    );
  }

  return (
    <main>
      {" "}
      <div>This will be settings</div>{" "}
    </main>
  );
};

export default Settings;
