import { z } from "zod";

export const ChatMessageSenderSchema = z.enum(["Referee", "EarthNation", "SeaNation", "EasternIsland"]);

export const ChatMessageSchema = z.object({
    sender: ChatMessageSenderSchema,
    recipient: ChatMessageSenderSchema,
    date: z.date(),
    content: z.string(),
});

export type ChatMessageSender = z.infer<typeof ChatMessageSenderSchema>;

export type ChatMessageModel = z.infer<typeof ChatMessageSchema>;
