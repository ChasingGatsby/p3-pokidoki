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

  const berryUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" +
    data.getOwnProfile.berry +
    "-berry.png";
  const itemUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" +
    data.getOwnProfile.heldItem +
    ".png";

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
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={berryUrl}
              alt={data.getOwnProfile.berry}
              style={{ width: "50px" }}
            ></img>
            <img
              src={itemUrl}
              alt={data.getOwnProfile.heldItem}
              style={{ width: "50px" }}
            ></img>
          </div>
          <img
            src={user.pokemon.image}
            className="card-img-top my-2"
            alt={user.pokemon.name}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <p className="card-text" style={{ fontSize: "10px" }}>
            {user.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
