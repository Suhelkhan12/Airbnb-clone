/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import {
  imageSchema,
  profileSchema,
  validateDataWithScehma,
} from "@/utils/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/utils/supabase";

const renderError = (error: unknown) => {
  return {
    message: error instanceof Error ? error.message : "Something went wrong!",
    status: "warning" as const,
  };
};

export const getAuthUser = async () => {
  const user = await currentUser();

  if (!user) throw new Error("You must be logged in to access this feature.");

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateDataWithScehma(profileSchema, rawData);

    // fetch current user from clerk
    const user = await currentUser();

    // checking if there is no user
    if (!user) throw new Error("Please login to create the profile.");

    //adding profile of the user to our db
    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });

    // TODO
    // updating meta data in clerk for the user who just created profile so that when user logs in they can be redirected to page other than /profile/create
    // await clerkClient.users.updateUserMetadata(user.id, {
    //   privateMetadata: {
    //     hasProfile: true,
    //   },
    // });

    return { message: "Profile created", status: "success" as const };
  } catch (err) {
    return renderError(err);
  }
};

export const fetchProfileImageAction = async () => {
  const user = await currentUser();

  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user?.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};

export const fetchProfileAction = async () => {
  const user = await getAuthUser();

  const profile = db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  // if no profile is found for the user
  if (!profile) redirect("/profile/create");

  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; status: "success" | "warning" }> => {
  //fetching current user
  const user = await getAuthUser();

  try {
    // validating fields of the form
    const rawData = Object.fromEntries(formData);

    const data = validateDataWithScehma(profileSchema, rawData);

    // updating the database
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data,
    });

    // for cache revlidtaion of the current route.
    revalidatePath("/profile");
    return {
      message: "Profile updated successfully.",
      status: "success" as const,
    };
  } catch (err) {
    return renderError(err);
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; status: "success" | "warning" }> => {
  // fetching user
  const user = await getAuthUser();

  try {
    //getting image from form & validating the image
    const image = formData.get("image") as File;
    const validatedFields = validateDataWithScehma(imageSchema, { image });

    //uploading image to supabase bucket and fetching the url
    const fullPathOfImageFromBucket = await uploadImage(validatedFields.image);

    //updating our user in db
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPathOfImageFromBucket,
      },
    });

    //cache revalidation
    revalidatePath("/profile");
    return {
      message: "Profile image updated successfully.",
      status: "success",
    };
  } catch (err) {
    return renderError(err);
  }
};
