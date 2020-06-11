import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Game from './Game';
import Login from './Login';

function App() {
  
const [isAuthenticated, setAuthenticated] = useState(false);
const [opponent, setOpponent] = useState("");

function onLogin(){
  setAuthenticated(!isAuthenticated);
}
function getOpponent(value){
  setOpponent(value);
}

  return (
    <div className="App">
      {
        isAuthenticated ?

          <Game opponent={opponent}/>
          :
          <Login login={onLogin} setOpponent={getOpponent}/>
      }
      
    </div>
  );
}

export default App;
