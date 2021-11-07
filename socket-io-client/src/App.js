import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState(0);

 let result;

  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("click", response);

    socket.on('click', function(msg) {
      
      result=msg;
      
      
    });

  },);

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("click", data => {
  //     setResponse(data);
  //   });
  // }, []);

  return (
    <>
    <p>
      <button onClick={() => setResponse(response +1)} >incremente {response}</button>
    </p>
    <div>
     result = {result}

    </div>
    </>
  );
}

export default App;