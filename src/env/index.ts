import { z } from "zod";

const envSchema = z.object({
  API_URL: z.string().url().default("http://localhost:3333"),
});

const _env = envSchema.safeParse(import.meta.env);

if (_env.success === false) {
  throw new Error("Failed to load environment variables");
}

export const Env = _env.data;
