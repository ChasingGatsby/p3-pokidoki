import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_OTHER_PROFILE } from "../utils/queries";

import MessageForm from "../components/MessageForm";

function OtherProfile() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_OTHER_PROFILE, {
    variables: { id: id },
  });
  console.log(id, data);
  console.log()

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message} </div>;

  return (
    <div className="container">
      <h1>Other Profile</h1>
      <p>ID: {data.getOtherProfile._id}</p>
      <p>Username: {data.getOtherProfile.username}</p>
      <p>Email: {data.getOtherProfile.email}</p>
      <div className="container">
        <MessageForm to={data.getOtherProfile.username} toID={data.getOtherProfile._id}  />
      </div>
    </div>
  );
}

export default OtherProfile;
