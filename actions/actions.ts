/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

import db from "@/utils/db";

import { profileSchema } from "@/utils/schema";

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);

    // fetch current user from clerk
    const user = await currentUser();

    // checking if there is no user
    if (!user) throw new Error("Something went wrong");

    //adding profile of the user to our db
    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl,
        ...validatedFields,
      },
    });

    // creating meta data in clerk so that when this user logs in again they will be redirected to page other than /profile/create

    return { message: "Profile created" };
  } catch (err) {
    console.log(err);
    return { message: "Something went wrong" };
  }
};
