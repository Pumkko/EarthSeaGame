import { z } from "zod";

export const NationArray = ["EarthNation", "SeaNation", "EasternIsland"] as const;

export const ENationSchema = z.enum(NationArray, {
    errorMap: (issue) => {
        switch (issue.code) {
            case "invalid_enum_value": {
                return {
                    message: "Nation must a known nation",
                };
            }
            default: {
                return {
                    message: "Something's wrong though I can't tell what",
                };
            }
        }
    },
});

export const NationSchema = z.object({
    name: ENationSchema,
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
    nation: ENationSchema,
});

export type GameMasterLobby = z.infer<typeof GameMasterLobbySchema>;
export type GameLobby = z.infer<typeof GameLobbySchema>;
export type JoinGameOutput = z.infer<typeof JoinGameOutputSchema>;
export type ENation = z.infer<typeof ENationSchema>;
export type SenderAndRecipientGroup = "EarthSeaGroup" | "EarthEasternGroup" | "SeaEasternGroup";
