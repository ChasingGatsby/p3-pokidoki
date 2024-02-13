import { Link } from "react-router-dom";

function SearchResult(props) {
  return (
    <div className="card m-2" style={{ width: "18rem" }} id={props.id}>
      <img src={props.image} className="card-img-top" alt={props.pokemon}
      style={{width:"100%", height: "200px", objectFit:"cover", borderBottom: "2px solid black" }} />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <Link to={`/profile/${props.id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default SearchResult;
