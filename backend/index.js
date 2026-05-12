import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import itemRouter from "./routes/item.routes.js";
import shopRouter from "./routes/shop.routes.js";
import orderRouter from "./routes/order.routes.js";

import { socketHandler } from "./socket.js";

const app = express();
const server = http.createServer(app);

/* ===================================
   CONFIG
=================================== */

const PORT = process.env.PORT || 8000;

/* ===================================
   ALLOWED ORIGINS
=================================== */

const allowedOrigins = [
  "http://prajapati.cloud",
  "http://www.prajapati.cloud",
  "http://localhost:5173",
  "http://vingo.prajapati.cloud"
];

/* ===================================
   SOCKET.IO
=================================== */

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"]
  }
});

app.set("io", io);

/* ===================================
   MIDDLEWARE
=================================== */

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ===================================
   ROUTES
=================================== */

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);
app.use("/api/shop", shopRouter);
app.use("/api/order", orderRouter);

/* ===================================
   HEALTH CHECK
=================================== */

app.get("/", (req, res) => {
  res.send("Backend API Running...");
});

/* ===================================
   SOCKET HANDLER
=================================== */

socketHandler(io);

/* ===================================
   START SERVER
=================================== */

server.listen(PORT, async () => {
  try {
    await connectDb();
    console.log("Database Connected");
    console.log(`Server Running On Port ${PORT}`);
  } catch (error) {
    console.log("Database Connection Failed:", error.message);
  }
});
