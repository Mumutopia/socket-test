const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("clientTalks", (count) => {
    io.emit("serverReponded", {
      mes: "je suis le serveur et je te parle" + count,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// const getApiAndEmit = socket => {

//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

server.listen(port, () => console.log(`Listening on port ${port}`));
