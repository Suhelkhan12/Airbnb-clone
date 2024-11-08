import * as z from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(3, { message: "Aleast 3 characters needed." }),
  lastName: z.string().min(3, { message: "Atleast 3 characters needed" }),
  userName: z.string().min(4, { message: "Atleast 4 characters required." }),
});
