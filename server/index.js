import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

io.on("connect", socket => {
  io.emit("setUserId", socket.id);

  socket.on("join", userId => {
    console.log("userId: ", userId);
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from API" });
});

server.listen(PORT, () => console.log(`Running on port ${PORT}`));
