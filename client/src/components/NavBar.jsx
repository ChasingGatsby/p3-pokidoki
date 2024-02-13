import { useContext } from "react";
import logo from "../images/logo.png";
import Auth from "../utils/auth";
import ThemeContext from "../utils/themeContext";

const NavBar = () => {
  const handleLogout = () => {
    Auth.logout();
  };

  const { theme } = useContext(ThemeContext);

  const themeStyles = {
    'Poke Ball': 'red',
    'Great Ball': 'blue',
    'Ultra Ball': 'orange',
    'Master Ball': 'purple',
  };

  if (!Auth.loggedIn()) {
    return (
      <header
        style={{ backgroundColor: themeStyles[theme], borderBottom: "solid 1px black" }}
      >
        <a href="/">
          <img className="logo" src={logo} alt="PokiDoki" />
        </a>
        <form>
          <div className="search">
            <span className="search-icon material-symbols-outlined">
              search
            </span>
            <input
              className="search-input"
              type="search"
              placeholder="Search..."
            />
          </div>
        </form>
        <nav>
          <ul className="nav_links">
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/search">Browse</a>
            </li>
            <li>
              <a href="/matches">Matches</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  return (
    <header
      style={{ backgroundColor: themeStyles[theme], borderBottom: "solid 1px black" }}
    >
      <a href="/">
        <img className="logo" src={logo} alt="PokiDoki" />
      </a>
      <form>
        <div className="search">
          <span className="search-icon material-symbols-outlined">search</span>
          <input
            className="search-input"
            type="search"
            placeholder="Search..."
          />
        </div>
      </form>
      <nav>
        <ul className="nav_links">
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
          <li>
            <a href="/search">Browse</a>
          </li>
          <li>
            <a href="/matches">Matches</a>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
