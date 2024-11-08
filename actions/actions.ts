/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { profileSchema } from "@/utils/schema";

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    console.log(validatedFields);
    return { message: "Profile created" };
  } catch (err) {
    console.log(err);
    return { message: "Something went wrong" };
  }
};
