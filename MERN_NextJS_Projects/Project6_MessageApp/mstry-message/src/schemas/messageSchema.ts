import { z } from "zod";

export const acceptMessageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "The message must be more then 10 characters." })
    .min(300, { message: "The message must not be more then 300 characters." }),
});
