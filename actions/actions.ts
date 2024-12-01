/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import {
  imageSchema,
  profileSchema,
  validateDataWithScehma,
  propertySchema,
  reviewSchema,
} from "@/utils/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/utils/supabase";
import { calculateTotals } from "@/utils/calculatetotals";

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

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{
  message: string;
  status: "success" | "warning";
}> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const propertyImage = formData.get("image") as File;

    const validatedFields = validateDataWithScehma(propertySchema, rawData);
    //validating images separately
    const validatedImage = validateDataWithScehma(imageSchema, {
      image: propertyImage,
    });

    // uploading image to supabase
    const fullImageUrl = await uploadImage(validatedImage.image);

    // pushing property to db
    await db.property.create({
      data: {
        ...validatedFields,
        image: fullImageUrl,
        profileId: user.id,
      },
    });
    return { message: "Property created.", status: "success" };
  } catch (err) {
    return renderError(err);
  }
};

// these properties are given here so that user can search and filter properites and they are optional because when user comes initially they won't have any filter's applied
export const fetchProperties = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      image: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return properties;
};

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });

  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();

  try {
    const { propertyId, pathname, favoriteId } = prevState;

    // if favorite id for property already exists then we will remove it from db otherwise we will add the property id to favorites
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed from favorites." : "Added to favorites.",
      status: favoriteId ? ("warning" as const) : ("success" as const),
    };
  } catch (err) {
    return renderError(err);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const properties = await db.favorite.findMany({
    where: {
      // this is where this profile id is coming in handy because we don't wanat to display all the favorites from our db but user specific favorites only
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          image: true,
          price: true,
        },
      },
    },
  });

  // returing the array of properties objects
  return properties.map((prop) => prop.property);
};

export const fetchPropertyDetails = async (id: string) => {
  return db.property.findUnique({
    where: {
      id,
    },
    include: {
      Profile: true,
      bookings: {
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  });
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const rowData = Object.fromEntries(formData);
    const validatedFields = validateDataWithScehma(reviewSchema, rowData);
    await db.review.create({
      data: {
        profileId: user.id,
        ...validatedFields,
      },
    });
    revalidatePath(`/properties/${validatedFields.propertyId}`);
    return {
      message: "Review submitted successfully.",
      status: "success" as const,
    };
  } catch (err) {
    return renderError(err);
  }
};

export const fetchPropertyReviewsAction = async (propertyId: string) => {
  const reviews = await db.review.findMany({
    where: {
      propertyId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
  });
  return reviews;
};

export const fetchPropertyReviewsByUserAction = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      comment: true,
      rating: true,
      property: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: { id: string }) => {
  const user = await getAuthUser();
  try {
    await db.review.delete({
      where: {
        id: prevState.id,
        profileId: user.id,
      },
    });
    revalidatePath("/reviews");
    return {
      message: "Review deleted successfully.",
      status: "success" as const,
    };
  } catch (err) {
    return renderError(err);
  }
};

export const fetchPropertyRating = async (propertyId: string) => {
  const result = await db.review.groupBy({
    by: ["propertyId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      propertyId,
    },
  });
  return {
    rating: result[0]?._avg.rating ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

export const findExistingReview = async (
  userId: string,
  propertyId: string
) => {
  return db.review.findFirst({
    where: {
      profileId: userId,
      propertyId: propertyId,
    },
  });
};

export const createBooking = async (prevState: {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
}) => {
  const user = await getAuthUser();
  const { propertyId, checkIn, checkOut } = prevState;

  const property = await db.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      price: true,
    },
  });

  if (!property)
    return { message: "Property not found", status: "warning" as const };

  const { orderTotal, totalNights } = calculateTotals({
    checkIn,
    checkOut,
    price: property.price,
  });

  try {
    await db.booking.create({
      data: {
        orderTotal,
        totalNights,
        checkIn,
        checkOut,
        profileId: user.id,
        propertyId,
      },
    });
  } catch (err) {
    return renderError(err);
  }
  redirect("/bookings");
};

export const fetchBookings = async () => {
  const user = await getAuthUser();
  const bookings = await db.booking.findMany({
    where: {
      profileId: user.id,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return bookings;
};

export const deleteBookings = async (prevState: { id: string }) => {
  const { id } = prevState;
  const user = await getAuthUser();
  try {
    await db.booking.delete({
      where: {
        id,
        profileId: user.id,
      },
    });

    return { message: "Booking deleted.", status: "success" as const };
  } catch (err) {
    return renderError(err);
  } finally {
    revalidatePath("/bookings");
  }
};

export const fetchRentals = async () => {
  const user = await getAuthUser();
  const rentals = await db.property.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  const rentalsWithBookings = await Promise.all(
    rentals.map(async (rental) => {
      const totalNightsBooking = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
        },
        _sum: {
          totalNights: true,
        },
      });
      const orderTotal = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
        },
        _sum: {
          orderTotal: true,
        },
      });

      return {
        ...rental,
        totalNightsSum: totalNightsBooking._sum.totalNights,
        orderTotalSum: orderTotal._sum.orderTotal,
      };
    })
  );

  return rentalsWithBookings;
};

export const deleteRentalAction = async (prevState: { propertyId: string }) => {
  const { propertyId } = prevState;
  const user = await getAuthUser();
  try {
    await db.property.delete({
      where: {
        id: propertyId,
        profileId: user.id,
      },
    });
    revalidatePath("/rentals");
    return {
      message: "Rental deleted successfully.",
      status: "success" as const,
    };
  } catch (err) {
    return renderError(err);
  }
};

export const fetchRentalDetails = async (propertyId: string) => {
  const user = await getAuthUser();
  return db.property.findUnique({
    where: {
      id: propertyId,
      profileId: user.id,
    },
  });
};

export const updateRentalAction = async (
  prevState: any,
  formData: FormData
): Promise<{
  message: string;
  status: "success" | "warning";
}> => {
  const user = await getAuthUser();
  const propertyId = formData.get("id") as string;
  try {
    const rowData = Object.fromEntries(formData);
    const validatedFields = validateDataWithScehma(propertySchema, rowData);
    await db.property.update({
      where: {
        id: propertyId,
        profileId: user.id,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/rentals/${propertyId}`);
    return { message: "Rental details updated.", status: "success" as const };
  } catch (err) {
    return renderError(err);
  }
};

export const updateRentalImage = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; status: "success" | "warning" }> => {
  const user = await getAuthUser();
  const propertyId = formData.get("id") as string;

  try {
    const image = formData.get("image") as File;
    const validatedFields = validateDataWithScehma(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);
    await db.property.update({
      where: {
        id: propertyId,
        profileId: user.id,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/rentals/${propertyId}`);
    return { message: "Rental image updated.", status: "success" as const };
  } catch (err) {
    return renderError(err);
  }
};
