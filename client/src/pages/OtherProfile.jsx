import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_OTHER_PROFILE, GET_OWN_PROFILE } from "../utils/queries";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { ADD_MATCH } from "../utils/mutations";
import MessageForm from "../components/MessageForm";

function OtherProfile() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_OTHER_PROFILE, {
    variables: { id: id },
  });
  const { data: ownProfileData } = useQuery(GET_OWN_PROFILE);
  const [addMatch, { data: mutationData }] = useMutation(ADD_MATCH);

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

  // Check if data and data.getOtherProfile exist before trying to access data.getOtherProfile's properties
  if (!data || !data.getOtherProfile) return <div>No profile found</div>;

  const handleAddMatch = () => {
    console.log(data.getOtherProfile.userName)
    addMatch({
      variables: {
        userName: data.getOtherProfile.userName,
      },
    }).then((res)=>console.log(res));
  };

  const currentUserID = ownProfileData.getOwnProfile._id;
  const otherUserID = data.getOtherProfile._id;
  const isMatched = data.getOtherProfile.matches.includes(currentUserID);
  const hasMatched = ownProfileData.getOwnProfile.matches.includes(otherUserID);

  return (
    <div className="container">
      <div className="card mb-2">
        <div className="card-body">
          <h1 className="card-title">
            {data.getOtherProfile.firstName} {data.getOtherProfile.lastName}
          </h1>
          <h3>@{data.getOtherProfile.userName}</h3>
          <img
            src={data.getOtherProfile.pokemon.image}
            className="card-img-top"
            alt={data.getOtherProfile.pokemon.name}
            style={{ width: "50%", height: "200px", objectFit: "cover" }}
          />
          <h4>Bio:</h4>
          <p className="card-text">{data.getOtherProfile.bio}</p>
          {!isMatched && !hasMatched && <button onClick={handleAddMatch}>Add Match</button>}
        </div>
      </div>
      <div className="container">
        {isMatched && hasMatched && (
          <MessageForm
            to={data.getOtherProfile.username}
            toID={data.getOtherProfile._id}
          />
        )}
      </div>
    </div>
  );
}

export default OtherProfile;
