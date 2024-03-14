import { z } from "zod";

export const GameLobbySchema = z.object({
    id: z.string().uuid(),
    gameMaster: z.string(),
    lobbyName: z.string(),
    earthNationInviteCode: z.string().uuid(),
    seaNationInviteCode: z.string().uuid(),
    easternIslandInviteCode: z.string().uuid(),
});

export type GameLobby = z.infer<typeof GameLobbySchema>;
