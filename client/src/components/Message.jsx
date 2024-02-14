import { GET_MESSAGES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import moment from "moment";

function Message(props) {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { to: id },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="d-flex flex-column">
      {data.getMessages.map((message, index) => {
        const isCurrentUser = message.from._id === props.from;
        const timestamp = parseInt(message.date);
        const date = moment(timestamp);
        const formattedDate = date.format("MM/DD/YY, h:mm a");
        return (
          <div
            className={`card ${isCurrentUser ? "mr-auto" : ""}`}
            style={{ width: "68%" }}
          >
            <h5
              className="card-header"
              style={{ backgroundColor: isCurrentUser ? "red" : "" }}
            >
              {message.from.userName} on {formattedDate}
            </h5>
            <div className="card-body">
              <p className="card-text">{message.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Message;
