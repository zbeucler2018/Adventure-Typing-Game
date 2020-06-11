import React, { useState, useEffect } from "react";

import { generatePhrase } from "./Misc/hooks/phrases/phrase";
import { useKeyPress } from "./Misc/hooks/keyPress";
import { currentTime } from "./Misc/hooks/time";

const initalWords = generatePhrase();

function Game(props) {
    // set state as empty arr with 20 spaces
    const [leftPadding, setLeftPadding] = useState(
      new Array(20).fill(" ").join("")
    );
  
    ///// UI /////
    const [outgoingChars, setOutgoingChars] = useState("");
    const [currentChar, setCurrentChar] = useState(initalWords.charAt(0));
    const [incomingChars, setIncomingChars] = useState(initalWords.substr(1));
    const [seconds, setSeconds] = useState(props.start);
    useEffect(() => {
        if (seconds > 0) {
          setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
          setSeconds('Start');
        }
      });
  
    /////// wpm ///////
    const [startTime, setStartTime] = useState();
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWpm] = useState(0);
  
    useKeyPress((key) => {
      if (!startTime) {
        setStartTime(currentTime());
      }
  
      //
      let updatedOutgoingChars = outgoingChars;
      let updatedIncomingChars = incomingChars;
  
      //
      if (key === currentChar) {
        //
        if (leftPadding.length > 0) {
          setLeftPadding(leftPadding.substring(1));
        }
        //
        updatedOutgoingChars += currentChar;
        setOutgoingChars(updatedOutgoingChars);
  
        //
        setCurrentChar(incomingChars.charAt(0));
  
        //
        updatedIncomingChars = incomingChars.substring(1);
        if (updatedIncomingChars.split(" ").length < 10) {
          updatedIncomingChars += " " + generatePhrase();
        }
        setIncomingChars(updatedIncomingChars);
  
        if (incomingChars.charAt(0) === " ") {
          //
          setWordCount(wordCount + 1);
          //
          const durationInMinutes = (currentTime() - startTime) / 60000.0;
          //
          setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
        }
      }
    });

    
  
    return (
      <div className="App">
        <div className="App-header">
          <p className="Character">
            <span className="Character-out">
              {(leftPadding + outgoingChars).slice(-20)}
            </span>
            <span className="Character-current">{currentChar}</span>
            <span>{incomingChars.substr(0, 20)}</span>
          </p>
  
          <h3>WPM: {wpm}</h3>

    <h2>Opponent: {props.opponent}</h2>
    
    <h1>{seconds}</h1>
        </div>
      </div>
    );
  }
  
  export default Game;