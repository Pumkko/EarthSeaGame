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

export const CreatedGameLobbySchema = z.object({
    accessToken: z.string(),
    createdGameLobby: GameLobbySchema,
});

export type CreatedGameLobby = z.infer<typeof CreatedGameLobbySchema>;

export type GameLobby = z.infer<typeof GameLobbySchema>;
