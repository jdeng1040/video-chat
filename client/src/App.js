import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Room from "./pages/Room";
import Home from "./pages/Home";
import MyContextProvider from "./context/RoomContext";

function App() {
  return (
    <Router>
      <MyContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </MyContextProvider>
    </Router>
  );
}

export default App;
