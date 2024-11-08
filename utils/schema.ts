import * as z from "zod";
import { ZodSchema } from "zod";

export const validateDataWithScehma = <T>(
  schema: ZodSchema<T>,
  data: unknown
): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((err) => err.message);
    throw new Error(errors.join("\n"));
  }

  return result.data;
};

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Aleast 3 characters needed." })
    .trim(),
  lastName: z
    .string()
    .min(3, { message: "Atleast 3 characters needed." })
    .trim(),
  userName: z
    .string()
    .min(4, { message: "Atleast 4 characters needed." })
    .trim(),
});
