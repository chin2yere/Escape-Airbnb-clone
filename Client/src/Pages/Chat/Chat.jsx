import React from "react";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Stack from "react-bootstrap/Stack";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { db } from "../../Components/firebase";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default function () {
  const location = useLocation();
  const name_data = location.state; // Access the passed props
  const name = name_data.ownerName;
  const messagesRef = collection(db, "messages");
  const [oldMessages, setOldMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { userContext } = useContext(UserContext);
  //const room = userContext.name + "-" + name;
  //const possible_room = name + "-" + userContext.name;
  const room = "John Doe-James Anderson";
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setOldMessages(messages);
      console.log(messages);
    });

    return () => unsuscribe();
  }, []);
  console.log(oldMessages);
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
  return (
    <div>
      {oldMessages.map((message) => (
        <div key={message.id} className="message">
          <span className="user">{message.user}:</span> {message.text}
        </div>
      ))}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          backgroundColor: "#333",
          padding: "10px",
          textAlign: "center",
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
