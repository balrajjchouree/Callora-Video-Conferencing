import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import streamRoutes from "./routes/stream.action.js";
import chatRoutes from "./routes/chat.action.js";

const app = express();

app.set("trust proxy", 1);

const clienturl = process.env.CLIENT_URL;
console.log(clienturl);

app.use(
  cors({
    origin: clienturl,
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/stream", streamRoutes);

app.use("/api/chat", chatRoutes);

export default app;
