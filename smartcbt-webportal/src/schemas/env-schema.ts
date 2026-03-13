import { z } from "zod";

export const envSchema = z.object({
  BASE_URL: z.string().url(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
