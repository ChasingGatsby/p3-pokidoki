import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_OTHER_PROFILE } from "../utils/queries";

function OtherProfile() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_OTHER_PROFILE, {
    variables: { id: id }
  });
  console.log(id, data)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message} </div>;

  return (
    <div>
      <h1>Other Profile</h1>
      <p>ID: {data.getOtherProfile._id}</p>
      <p>First Name: {data.getOtherProfile.firstName}</p>
      <p>Email: {data.getOtherProfile.email}</p>
    </div>
  );
}

export default OtherProfile;
