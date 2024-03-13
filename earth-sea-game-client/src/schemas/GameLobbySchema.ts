import { z } from "zod";

export const GameLobbySchema = z.object({
  id: z.string().uuid(),
  gameMaster: z.string(),
  lobbyName: z.string(),
});

export type GameLobby = z.infer<typeof GameLobbySchema>;
