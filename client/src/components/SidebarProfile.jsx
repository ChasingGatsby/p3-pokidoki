import { useQuery } from "@apollo/client";
import { GET_OWN_PROFILE } from "../utils/queries";
import Auth from "../utils/auth";
const Sidebar = () => {
  if (!Auth.loggedIn()) {
    return <div>go log in</div>;
  }
  const { loading, data } = useQuery(GET_OWN_PROFILE);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data.getOwnProfile;
  return (
    <div className="col-2" style={{ height: "100vh", overflow: "auto" }}>
      <div className="card h-100">
        {/* <img src={user.profilePic} className="card-img-top" alt="Profile" /> */}
        <div className="card-body">
          <h5 className="card-title">
            {user.firstName} {user.lastName}
          </h5>
          <img
            src={user.pokemon.image}
            className="card-img-top my-2"
            alt={user.pokemon.name}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <p className="card-text">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
