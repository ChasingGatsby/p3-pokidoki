import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_OTHER_PROFILE } from "../utils/queries";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { ADD_MATCH } from "../utils/mutations";
import MessageForm from "../components/MessageForm";

function OtherProfile() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_OTHER_PROFILE, {
    variables: { id: id },
  });
  console.log(id, data);

  const [addMatch, { data: mutationData }] = useMutation(ADD_MATCH);

  const handleAddMatch = () => {
    addMatch({
      variables: {
        userName: data.getOtherProfile.userName,
        firstName: data.getOtherProfile.firstName,
      },
    });
  };

  if (!Auth.loggedIn()) {
    return (
      <div>
        <p>You must be logged in to view this page.</p>
        <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message} </div>;

  return (
    <div className="container">
      <div className="card mb-2">
        <div className="card-body">
          <h1 className="card-title">
            {data.getOtherProfile.firstName} {data.getOtherProfile.lastName}
          </h1>
          <img
            src={data.getOtherProfile.pokemon.image}
            className="card-img-top"
            alt={data.getOtherProfile.pokemon.name}
            style={{ width: "50%", height: "200px", objectFit: "cover" }}
          />
          <h4>Bio:</h4>
          <p className="card-text">{data.getOtherProfile.bio}</p>
          <button onClick={handleAddMatch}>Add Match</button>
        </div>
      </div>
      <div className="container">
        <MessageForm
          to={data.getOtherProfile.username}
          toID={data.getOtherProfile._id}
        />
      </div>
    </div>
  );
}

export default OtherProfile;
