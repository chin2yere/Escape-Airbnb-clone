import React from "react";
//import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Stack from "react-bootstrap/Stack";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { db } from "../../Components/firebase";
import "./Chat.css";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default function ({ activeTab }) {
  const messagesRef = collection(db, "messages");
  const [oldMessages, setOldMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { userContext } = useContext(UserContext);
  const room = userContext.name + "-" + activeTab;
  const possible_room = activeTab + "-" + userContext.name;
  console.log(possible_room);
  //const room = "John Doe-James Anderson";
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "in", [room, possible_room]),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setOldMessages(messages);
      //console.log(messages);
    });

    return () => unsuscribe();
  }, [activeTab]);
  //console.log(oldMessages);
  const handleSubmit = async (event) => {
    //event.preventDefault();

    if (message === "") return;
    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      user: userContext.name,
      room,
    });

    setMessage("");
  };
  function getCss(user) {
    if (user === userContext.name) {
      return "messageUser";
    } else {
      return "message";
    }
  }
  return (
    <div>
      <div
        style={{
          position: "fixed",
          height: "100%", // Set height to make it scrollable
          overflowY: "auto",
          top: "0",
          left: "0",
          width: "70%",
          maxHeight: "550px",

          textAlign: "center",
          marginLeft: " 460px",
        }}
      >
        {oldMessages.map((message) => (
          <div key={message.id} className={getCss(message.user)}>
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "70%",
          backgroundColor: "#333",
          padding: "10px",
          textAlign: "center",
          marginLeft: " 460px",
        }}
      >
        <Stack direction="horizontal" gap={2}>
          <div className="p-1" style={{ width: "100%" }}>
            <Form.Control
              id="message-input"
              as="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                resize: "none",
                width: "100%",
                minHeight: "50px",
                fontSize: "16px",
                padding: "10px",
                border: "2px solid #ccc",
              }}
            />
          </div>
          <div className="p-2 ms-auto">
            <Button onClick={() => handleSubmit()}>Send</Button>
          </div>
        </Stack>
      </div>
    </div>
  );
}
