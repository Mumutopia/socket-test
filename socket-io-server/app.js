const express = require("express");
const http = require("http");
const socketIo = require("socket.io");


const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);


const server = http.createServer(app);

const io = socketIo(server);



io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("click",(result)=> {
    io.emit("click", result)
    console.log(result);
  })


  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    
  });
});

// const getApiAndEmit = socket => {
  
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

server.listen(port, () => console.log(`Listening on port ${port}`));