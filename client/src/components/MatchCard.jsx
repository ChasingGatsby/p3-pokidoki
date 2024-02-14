import { Link } from "react-router-dom";

function MatchCard(props) {
  return (
    <Link to={`/profile/${props.id}`}>
      <div className="card m-2" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            {props.firstName} {props.lastName}
          </h5>
          <h6>@{props.userName}</h6>
          <p>{props.id}</p>
          <p>{props.pokemon}</p>
        </div>
      </div>
    </Link>
    // <div className="card m-2" style={{ width: "18rem" }}>
    //   <div className="card-body">
    //     <h5 className="card-title">
    //       {props.firstName} {props.lastName}
    //     </h5>
    //     <h6>@{props.userName}</h6>
    //     <p>{props.id}</p>

    //     <Link to={`/profile/${props.id}`} className="btn btn-primary">
    //       View Profile
    //     </Link>
    //   </div>
    // </div>
  );
}

export default MatchCard;
