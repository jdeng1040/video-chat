import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/RoomContext";

export default function Video(props) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = props.stream;
    }
  }, [props.stream]);
  return (
    <div>
      <video ref={videoRef} autoPlay muted={true} />
    </div>
  );
}

const styles = {
  //   main: {
  //     display: "flex",
  //     justifyContent: "space-between",
  //     margin: "3%",
  //   },
};
