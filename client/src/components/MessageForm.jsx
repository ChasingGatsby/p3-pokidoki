import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../utils/mutations";

function MessageForm(props) {
  const [messageText, setMessageText] = useState("");

  const [sendMessage, { data }] = useMutation(SEND_MESSAGE);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await sendMessage({
        variables: { to: props.toID, text: messageText },
      });
      setMessageText("");

      // Handle successful message sending (e.g., clear the form)
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card col-8">
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Message text"
      />
      <button type="submit">Send Message</button>
    </form>
  );
}

export default MessageForm;
