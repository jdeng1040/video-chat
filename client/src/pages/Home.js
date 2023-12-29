import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { MyContext } from "../context/RoomContext";

export default function Home() {
  const { socket } = useContext(MyContext);

  function handleJoinRoom() {
    socket.emit("create-room");
  }

  return (
    <div style={styles.main}>
      <button style={styles.button} onClick={handleJoinRoom}>Join Video Call Room</button>
    </div>
  );
}

const styles = {
    main: {
      display: "flex",
      justifyContent: "center",
      margin: "10%",
    },
    button: {
      padding: "1%",
      cursor: "pointer",
    },
};
