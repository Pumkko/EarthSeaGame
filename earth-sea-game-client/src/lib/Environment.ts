import { z } from "zod";

export const EnvironmentSchema = z.object({
  VITE_API_ROOT_URL: z.string().url(),
});
