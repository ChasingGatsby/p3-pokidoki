import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import ThemeContext from "../utils/themeContext";
import Auth from "../utils/auth";

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [activeTheme, setActiveTheme] = useState("Poke Ball");

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
      <div className="container mt-4 card" style={{ borderColor: "white" }}>
        <div class="list-group">
          <button
            type="button"
            className={`list-group-item list-group-item-action ${
              activeTheme === "Poke Ball" ? "active" : ""
            }`}
            onClick={() => {
              setTheme("Poke Ball");
              setActiveTheme("Poke Ball");
            }}
          >
            Poke Ball
          </button>
          <button
            type="button"
            className={`list-group-item list-group-item-action ${
              activeTheme === "Great Ball" ? "active" : ""
            }`}
            onClick={() => {
              setTheme("Great Ball");
              setActiveTheme("Great Ball");
            }}
          >
            Great Ball
          </button>
          <button
            type="button"
            className={`list-group-item list-group-item-action ${
              activeTheme === "Ultra Ball" ? "active" : ""
            }`}
            onClick={() => {
              setTheme("Ultra Ball");
              setActiveTheme("Ultra Ball");
            }}
          >
            Ultra Ball
          </button>
          <button
            type="button"
            className={`list-group-item list-group-item-action ${
              activeTheme === "Master Ball" ? "active" : ""
            }`}
            onClick={() => {
              setTheme("Master Ball");
              setActiveTheme("Master Ball");
            }}
          >
            Master Ball
          </button>
        </div>
      </div>
    </main>
  );
};

export default Settings;
