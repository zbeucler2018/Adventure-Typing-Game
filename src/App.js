import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Game from "./Game";
import Login from "./Login";
import io from "socket.io-client";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [opponent, setOpponent] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [name, setName] = useState("");
  const socket = io.connect("https://721461e8bf88.ngrok.io");
  function onLogin() {
    setAuthenticated(!isAuthenticated);
  }
  function getOpponent(value) {
    setOpponent(value);
  }

  function start(value) {
    setStartTime(value);
  }

  function assignName(value){
    setName(value);
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <Game opponent={opponent} start={startTime} username={name} socket={socket}/>
      ) : (
        <Login login={onLogin} setOpponent={getOpponent} getStart={start} assignName={assignName} socket={socket} />
      )}
    </div>
  );
}

export default App;
