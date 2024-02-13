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
      }}
    >
      <MdCatchingPokemon size={20} />
      <label className="mx-3" style={{ fontSize: "15px" }}>
        Disclaimer
      </label>
      <MdCatchingPokemon size={20} />
    </footer>
  );
}
