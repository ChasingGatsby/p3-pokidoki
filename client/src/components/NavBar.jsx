import logo from "../images/logo.png";

const NavBar = () => {
  return (
    <header>
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
            <a href="#">Matches</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
