import { Link } from "react-router-dom";
import pokeBallC from "../images/pokeBallz_closed.png";
import pokeBallO from "../images/pokeBallz_open.png";

function MatchCard(props) {
  return (
    <div
      className="card m-2"
      style={{ width: "40rem", backgroundColor: "rgb(255,255, 255)" }}
    >
      <div
        className="card-body"
        style={{
          wordWrap: "break-word",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        Trainer Card:
        <h5 className="card-title">
          {props.firstName} {props.lastName}
        </h5>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <Link to={`/profile/${props.id}`}>
            <div className="pokeball-container">
              <img src={pokeBallC} className="pokeball-front"></img>
              <img src={pokeBallO} className="pokeball-back"></img>
              <div className="pokeball-text">
                <p>Trainer: @{props.userName}</p>
                <p>Trainer no. {props.id}</p>
              </div>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default MatchCard;
