/* eslint-disable @next/next/no-img-element */
import { LuUser2 } from "react-icons/lu";
import { fetchProfileImageAction } from "@/actions/actions";

async function UserIcon() {
  const profileImgUrl = await fetchProfileImageAction();

  if (profileImgUrl)
    return (
      <img
        src={profileImgUrl}
        alt="User profile image"
        className=" size-6 rounded-full"
      />
    );
  return (
    <LuUser2 className=" bg-primary rounded-full text-white dark:bg-muted" />
  );
}
export default UserIcon;
