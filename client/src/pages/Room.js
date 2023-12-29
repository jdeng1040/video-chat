import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../context/RoomContext";
import Video from "../components/VideoScreen";

export default function Room() {
  const { socket, me, stream, peers } = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    if (me) {
      socket.emit("join-room", { roomId: id, peerId: me._id });
    }
  }, [id, me, socket, stream]);
  
  console.log("size", Object.values(peers).length);
  return (
    <div style={styles.main}>
      ROOM PAGE ID/LINK: http://localhost:3000/room/{id}
      <Video stream={stream} />
      {Object.values(peers).map((peer) => {
        console.log("mapping", peer.stream);
        return <Video stream={peer.stream} />;
      })}
    </div>
  );
}

const styles = {
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "5%",
    },
};
