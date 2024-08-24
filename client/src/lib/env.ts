// "use client";
import z from "zod";
// import "dotenv/config";

const envSchema = z.object({
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
});

export const ENV = envSchema.parse({
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  ...process.env,
});
