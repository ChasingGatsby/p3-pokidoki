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

  console.log(data.getMessages)

  return (
    <div>
      {data.getMessages.map((message) => {
        const timestamp = parseInt(message.date);
        const date = moment(timestamp);
        const formattedDate = date.format("MM/DD/YY, h:mm a");
        return (
          <div className="card my-2">
            <h5 className="card-header">
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
