import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import streamRoutes from "./routes/stream.action.js";
import chatRoutes from "./routes/chat.action.js";

const app = express();

const clienturl = process.env.CLIENT_URL;

app.use(
  cors({
    origin: clienturl,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/stream", streamRoutes);

app.use("/api/chat", chatRoutes);

export default app;
