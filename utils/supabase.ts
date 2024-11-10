import { createClient } from "@supabase/supabase-js";

const bucket = "homestayz images";

// creating a supabase client in order to interact with database
export const supabase = createClient(
  process.env.SUPBASE_URL as string,
  process.env.SUPABASE_KEY as string
);

// for uploading the image to our supbase bucket
export const uploadImage = async (image: File) => {
  const timeStamp = Date.now();

  //setting up new name for image
  const newNameForImage = `${timeStamp}-${image.name}`;

  const { data } = await supabase.storage
    .from(bucket)
    .upload(newNameForImage, image, {
      cacheControl: "3600",
    });

  if (!data) throw new Error("Image upload failded.");
  return supabase.storage.from(bucket).getPublicUrl(newNameForImage).data
    .publicUrl;
};
