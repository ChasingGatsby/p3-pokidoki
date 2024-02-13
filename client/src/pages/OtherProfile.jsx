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
        matchId: data.getOtherProfile._id,
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
      <h1>Other Profile</h1>
      <button onClick={handleAddMatch}>Add Match</button>
      <p>ID: {data.getOtherProfile._id}</p>
      <p>Username: {data.getOtherProfile.username}</p>
      <p>Email: {data.getOtherProfile.email}</p>
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
