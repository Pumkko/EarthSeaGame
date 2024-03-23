import { z } from "zod";
import { ENationSchema } from "./GameLobbySchema";

export const ChatMessageSenderSchema = z.union([ENationSchema, z.enum(["GameMaster"])]);

export const ChatMessageSchema = z.object({
    sender: z.union([ENationSchema, ChatMessageSenderSchema]),
    recipient: ChatMessageSenderSchema,
    date: z.date(),
    content: z.string(),
});

export type ChatMessageSender = z.infer<typeof ChatMessageSenderSchema>;

export type ChatMessageModel = z.infer<typeof ChatMessageSchema>;
