import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:4001";
const socket = socketIOClient(ENDPOINT); // c'est ton objeytt de transport vers server

function App() {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(null);

  const handleClick = (evt) => {
    setCount(count + 1)
    socket.emit("clientTalks", count)
  }

  // useEffect(() => {
    socket.on("serverReponded", message => {
      setResult(message);
    });
  // }, []);

  return (
    <>
    <p>
      <button onClick={handleClick} >incremente {count}</button>
    </p>
    <div>
     result = {JSON.stringify(result)}

    </div>
    </>
  );
}

export default App;