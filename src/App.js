import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Game from "./Game";
import Login from "./Login";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [opponent, setOpponent] = useState("");
  const [startTime, setStartTime] = useState(0);

  function onLogin() {
    setAuthenticated(!isAuthenticated);
  }
  function getOpponent(value) {
    setOpponent(value);
  }

  function start(value) {
    setStartTime(value);
    console.log(startTime);
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <Game opponent={opponent} start={startTime} />
      ) : (
        <Login login={onLogin} setOpponent={getOpponent} getStart={start} />
      )}
    </div>
  );
}

export default App;
