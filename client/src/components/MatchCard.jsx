import { Link } from "react-router-dom";

function MatchCard(props) {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
      </div>
    </div>
  );
}

export default MatchCard;
