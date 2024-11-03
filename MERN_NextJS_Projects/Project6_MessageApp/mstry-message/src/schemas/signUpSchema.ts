import { z } from "zod";

export const userNameValiditation = z
  .string()
  .min(2, { message: "User name must of more then 2 characters." })
  .max(20, { message: "User name must not be more then 20 characters." });
// .regex(/^[a-zA-Z0-9_]+$/, {
//   message: "User name must not contain special characters.",
// });

export const signUpSchema = z.object({
  userName: userNameValiditation,
  email: z.string().email({ message: "The given email is invalid" }),
  password: z
    .string()
    .min(6, { message: "The passsword must be more then 6 characters." })
    .max(20, {
      message: "The passsword must be no more less then 10 characters.",
    }),
});
