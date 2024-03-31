// eslint-disable-next-line no-unused-vars
import React from "react";
import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [room,setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [msgRec, setMsgRec] = useState("");

  const joinRoom = () => {
    if (room !== "" ){
      socket.emit("join_room" ,room)
    }
  };
  const sendMessage = () => {
    socket.emit("send_message", { message, room});
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgRec(data.message);
      alert(data.message);
    });
  }, []);
  return (
    <div className="App">
      <input
        placeholder="Room Number.."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}> Join Room </button>

      <input
        placeholder="Message.."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}> Message </button>
      <h1> Message : </h1>
      {msgRec}
    </div>
  );
}

export default App;
