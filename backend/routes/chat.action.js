import express from "express";
import { StreamChat } from "stream-chat";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/token", requireAuth(), async (req, res) => {
  try {
    const apiKey = process.env.STREAM_CHAT_API_KEY;
    const secretKey = process.env.STREAM_CHAT_SECRET_KEY;

    const chatClient = StreamChat.getInstance(apiKey, secretKey);

    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = chatClient.createToken(userId);

    res.json({ token });
  } catch (error) {
    console.error("Chat token error:", error);
    res.status(500).json({ error: "Chat token failed" });
  }
});

router.post("/channel", requireAuth(), async (req, res) => {
  try {
    const apiKey = process.env.STREAM_CHAT_API_KEY;
    const secretKey = process.env.STREAM_CHAT_SECRET_KEY;

    const chatClient = StreamChat.getInstance(apiKey, secretKey);

    const { meetingId } = req.body;
    const { userId } = req.auth();

    const channel = chatClient.channel("messaging", meetingId, {
      name: "Meeting Chat",
      created_by_id: userId,
      custom: {
        chatLocked: false,
      },
    });

    await channel.create();
    await channel.addMembers([userId]);

    res.json({ success: true });
  } catch (error) {
    console.error("Channel join error:", error);
    res.status(500).json({ error: "Failed to join chat channel" });
  }
});

export default router;
