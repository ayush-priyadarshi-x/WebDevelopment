import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "The message must be more then 10 characters." })
    .max(1000, {
      message: "The message must not be more less than 300 characters.",
    }),
});
