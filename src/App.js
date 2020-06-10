import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Game from './Game';
import Login from './Login';

function App() {
  
const [isAuthenticated, setAuthenticated] = useState(false);

function onLogin(){
  setAuthenticated(!isAuthenticated);
  console.log(isAuthenticated);
}

  return (
    <div className="App">
      {
        isAuthenticated ?

          <Game/>
          :
          <Login login={onLogin}/>
      }
      
    </div>
  );
}

export default App;
