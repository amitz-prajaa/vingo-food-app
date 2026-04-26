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

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://3.104.63.68";

/* ===================================
   SOCKET.IO
=================================== */

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

/* ===================================
   MIDDLEWARE
=================================== */

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
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
   SOCKET HANDLER
=================================== */

socketHandler(io);

/* ===================================
   START SERVER
=================================== */

server.listen(PORT, async () => {
  try {
    await connectDb();
    console.log("DB connected");
    console.log(`Server started on port ${PORT}`);
  } catch (error) {
    console.log("DB connection failed:", error.message);
  }
});
