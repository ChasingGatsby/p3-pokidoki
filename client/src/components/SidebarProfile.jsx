import { useQuery } from "@apollo/client";
import { GET_OWN_PROFILE } from "../utils/queries";

const Sidebar = () => {
  const { loading, data } = useQuery(GET_OWN_PROFILE);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data.getOwnProfile);
  const user = data.getOwnProfile;

  return (
    <div className="col-2" style={{ height: "100vh", overflow: "auto" }}>
      <div className="card h-100">
        {/* <img src={user.profilePic} className="card-img-top" alt="Profile" /> */}
        <div className="card-body">
          <h5 className="card-title">
            {user.firstName} {user.lastName}
          </h5>
          <h6>@{user.userName}</h6>
          <img
            src={user.pokemon.image}
            className="card-img-top my-2"
            alt={user.pokemon.name}
            style={{ width: "100%", height: "200px", objectFit: "cover", }}
          />
          <p className="card-text">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
