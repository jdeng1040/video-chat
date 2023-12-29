// MyContextProvider.js
import React, { useState, useEffect, useReducer } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { peesrReducer } from "./peerReducer";
import { addPeerAction, removePeerAction } from "./peerActions";

export const MyContext = createContext();

const serverHost = "http://localhost:8000";

const socket = io.connect(serverHost);

const MyContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [me, setMe] = useState();
  const [stream, setStream] = useState();
  const [peers, dispatch] = useReducer(peesrReducer, {});

  useEffect(() => {
    const currentId = uuidV4();
    const peer = new Peer(currentId, {
      host: "localhost",
      port: 9000,
      path: "/myapp",
    });
    setMe(peer);
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
        });
    } catch (error) {
      console.log(error);
    }
    socket.on("room-created", (data) => {
      console.log("room-create", data.roomId);
      navigate(`/room/${data.roomId}`);
    });
    socket.on("get-users", (participants) => {
      console.log("participants", participants);
    });
    socket.on("user-disconnected", (peerId) => {
      dispatch(removePeerAction(peerId));
    });
  }, []);

  useEffect(() => {
    if (!me || !stream) return;

    socket.on("user-joined", ({ peerId }) => {
      console.log("userJOINED");
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    me.on("call", (call) => {
      console.log("USERCALLED");
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);

  console.log({ peers });

  return (
    <MyContext.Provider value={{ socket, me, stream, peers }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
