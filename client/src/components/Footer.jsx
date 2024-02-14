import { MdCatchingPokemon } from "react-icons/md";
import { useContext } from "react";
import ThemeContext from "../utils/themeContext";

const themeStyles = {
  "Poke Ball": "red",
  "Great Ball": "blue",
  "Ultra Ball": "orange",
  "Master Ball": "purple",
};

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: themeStyles[theme],
        borderTop: "2px solid black",
        maxWidth: "100vw",
      }}
    >
      <MdCatchingPokemon size={20} />
      <label className="mx-3" style={{ fontSize: "15px" }}>
       Disclaimer:
      </label>{" "}
      <MdCatchingPokemon size={20} />
      <label style={{ fontSize: "9px" }}>
        This application is a fan-made project and is not affiliated with the
        official Pokémon brand, The Pokémon Company, or Nintendo. All Pokémon
        content, including images, names, and information, are owned by The
        Pokémon Company and Nintendo. This application uses these assets for the
        purpose of fan enjoyment and is not intended for commercial use.
      </label>
    </footer>
  );
}
