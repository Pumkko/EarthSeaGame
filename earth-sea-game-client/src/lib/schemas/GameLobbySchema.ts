import { z } from "zod";

export const NationSchema = z.object({
    name: z.string(),
    inviteCode: z.string(),
    inviteCodeCreationDate: z.string().datetime({ offset: true }),
    inviteCodeAlreadyUsed: z.boolean(),
});

export const GameLobbySchema = z.object({
    id: z.string().uuid(),
    gameMaster: z.string(),
    lobbyName: z.string(),
    earthNation: NationSchema,
    seaNation: NationSchema,
    easternIsland: NationSchema,
});

export const GameMasterLobbySchema = z.object({
    accessToken: z.string(),
    gameLobby: GameLobbySchema,
});

export const JoinGameOutputSchema = z.object({
    accessToken: z.string(),
    gameMaster: z.string(),
    nation: z.string(),
});

export type GameMasterLobby = z.infer<typeof GameMasterLobbySchema>;
export type GameLobby = z.infer<typeof GameLobbySchema>;
export type JoinGameOutput = z.infer<typeof JoinGameOutputSchema>;
