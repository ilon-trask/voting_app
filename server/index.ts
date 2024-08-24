import { createServer } from "node:http";
import { Server } from "socket.io";
import {
  addOptionLabel,
  choseLabel,
  counterLabel,
  createRoomLabel,
  getDataLabel,
  giveDataLabel,
  joinRoomLabel,
} from "../consts";
import { SendCreateRoom, type SendVoteType } from "../types";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cookie: {
    name: "io",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  },
  cors: { origin: "*" },
});

const roomIdCache = new Set();
const authorCache = new Set<SendCreateRoom>();
let intervalId: NodeJS.Timeout;

function findObjInSet(roomId: string) {
  for (const obj of authorCache) {
    if (obj.roomId === roomId) {
      return obj;
    }
  }
  return undefined;
}

app.use((req, res, next) => {
  if (intervalId) return next();
  console.log("clear");
  intervalId = setInterval(() => {
    authorCache.clear();
  }, 24 * 60 * 60 * 1000);
  next();
});

io.on("connection", (socket) => {
  socket.on(joinRoomLabel, (roomId) => {
    socket.join(roomId);
    const authorId = findObjInSet(roomId)?.authorId;
    io.to(roomId).emit(getDataLabel, { roomId, authorId });
  });
  socket.on(
    counterLabel,
    ({ roomId, timer }: { roomId: string; timer: number }) => {
      if (roomIdCache.has(roomId)) {
        return;
      }
      roomIdCache.add(roomId);
      let counter = timer;
      const WinnerCountdown = setInterval(function () {
        io.to(roomId).emit(counterLabel, counter);
        counter--;
        if (counter <= 0) {
          io.sockets.emit(counterLabel, counter);
          clearInterval(WinnerCountdown);
        }
      }, 1000);
    }
  );
  socket.on(giveDataLabel, ({ roomId, data }) => {
    io.to(roomId).emit(giveDataLabel, data);
  });
  socket.on(addOptionLabel, (data) => {
    io.to(data.room).emit(addOptionLabel, data.value);
  });
  socket.on(choseLabel, (data: { room: string; value: SendVoteType }) => {
    io.to(data.room).emit(choseLabel, data.value);
  });
});
io.on(createRoomLabel, (data: SendCreateRoom) => {
  console.log(data);
});

app.get("/", (req, res) => res.json({ hello: "world" }));

app.post("/" + createRoomLabel, (req, res) => {
  const { roomId, authorId } = req.body as SendCreateRoom;
  try {
    authorCache.add({
      roomId,
      authorId,
    });
    return res.status(200).json({ res: "ok" });
  } catch (error) {
    return res.status(500).json({ res: "bad" });
  }
});

httpServer.listen(8080).once("listening", () => {
  console.log("Server is listening on port 8080");
});
