import express from "express";
import { StreamClient } from "@stream-io/node-sdk";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/token", requireAuth(), async (req, res) => {
  try {
    const apiKey = process.env.STREAM_API_KEY;
    const secretKey = process.env.STREAM_SECRET_KEY;

    if (!apiKey || !secretKey) {
      throw new Error("Stream API key or secret missing");
    }

    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const client = new StreamClient(apiKey, secretKey);

    const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = client.createToken(userId, expiresAt, issuedAt);

    res.json({ token });
  } catch (error) {
    console.error("Stream token error:", error);
    res.status(500).json({ error: "Token generation failed" });
  }
});

export default router;
