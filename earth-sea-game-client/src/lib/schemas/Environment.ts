import { z } from "zod";

export const EnvironmentSchema = z.object({
    VITE_API_ROOT_URL: z.string().url(),
    VITE_AZURE_AD_CLIENT_ID: z.string().uuid(),
    VITE_AZURE_AD_TENANT_ID: z.string().uuid(),
    VITE_AZURE_AD_API_SCOPE: z.string(),
});

export type AppEnvironment = z.infer<typeof EnvironmentSchema>;
