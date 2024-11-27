import Image from "next/image";
import React from "react";

type UserInfoProps = {
  profile: {
    profileImage: string;
    name: string;
  };
};

const UserInfo = ({ profile }: UserInfoProps) => {
  const { profileImage, name } = profile;
  return (
    <article className="grid grid-cols-[auto,1fr] gap-4 mt-4">
      <Image
        src={profileImage}
        alt={name}
        width={50}
        height={50}
        className="rounded-md object-cover w-12 h-12"
      />
      <div>
        <p>
          Hosted by <span className="font-bold capitalize">{name}</span>
        </p>
        <p className="text-muted-foreground font-light">
          Superhost &middot; 2 years hosting
        </p>
      </div>
    </article>
  );
};

export default UserInfo;