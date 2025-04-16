import * as z from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export type IProfileForm = z.infer<typeof ProfileSchema>;
