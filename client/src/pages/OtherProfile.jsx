import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_OTHER_PROFILE,
  GET_OWN_PROFILE,
  GET_MATCHES,
  GET_OTHER_MATCHES,
} from "../utils/queries";
import Auth from "../utils/auth";
import { ADD_MATCH } from "../utils/mutations";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";

function OtherProfile() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_OTHER_PROFILE, {
    variables: { id: id },
  });
  const { data: ownProfileData } = useQuery(GET_OWN_PROFILE);
  const { loading: matchesLoading, data: matchesData } = useQuery(GET_MATCHES);
  const { data: otherMatchesData } = useQuery(GET_OTHER_MATCHES, {
    variables: { id: id },
  });

  const [addMatch, { data: mutationData }] = useMutation(ADD_MATCH);

  const [buttonClicked, setButtonClicked] = useState(false);

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

  const currentUserID = ownProfileData.getOwnProfile._id;
  const otherUserID = data.getOtherProfile._id;
  let currentUserMatches = [];
  let otherUserMatches = [];
  if (matchesData && matchesData.getMatches) {
    currentUserMatches = matchesData.getMatches.matches;
  }

  if (otherMatchesData && otherMatchesData.getOtherMatches) {
    otherUserMatches = otherMatchesData.getOtherMatches.matches;
  }

  const isMatched = currentUserMatches.some(
    (match) => match._id === otherUserID
  );
  const hasMatched = otherUserMatches.some(
    (match) => match._id === currentUserID
  );

  const handleAddMatch = () => {
    console.log(data.getOtherProfile.userName);
    addMatch({
      variables: {
        userName: data.getOtherProfile.userName,
      },
    }).then((res) => console.log(res));
    setButtonClicked(true);
  };

  const berryUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" +
    data.getOtherProfile.berry +
    "-berry.png";
  const itemUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" +
    data.getOtherProfile.heldItem +
    ".png";

  return (
    <div className="container">
      <div className="card my-4">
        <div className="card-body">
          <h1 className="card-title">
            {data.getOtherProfile.firstName} {data.getOtherProfile.lastName}
          </h1>
          <h3>
            @{data.getOtherProfile.userName}
            <img
              src={berryUrl}
              alt={data.getOtherProfile.berry}
              style={{ width: "50px" }}
            ></img>
            <img
              src={itemUrl}
              alt={data.getOtherProfile.heldItem}
              style={{ width: "50px" }}
            ></img>
          </h3>
          <img
            src={data.getOtherProfile.pokemon.image}
            className="card-img-top"
            alt={data.getOtherProfile.pokemon.name}
            style={{ width: "50%", height: "200px", objectFit: "cover" }}
          />
          <h4>Bio:</h4>
          <p className="card-text">{data.getOtherProfile.bio}</p>
          {!isMatched && (
            <button onClick={handleAddMatch} disabled={buttonClicked}>
              {buttonClicked ? "Matched" : "Add Match"}
            </button>
          )}
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
      <div>
        <Message
          from={currentUserID}
          to={otherUserID}
          toName={data.getOtherProfile.userName}
          fromName={ownProfileData.getOwnProfile.userName}
        />
      </div>
    </div>
  );
}

export default OtherProfile;
