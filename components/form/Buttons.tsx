"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuTrash, LuPenSquare } from "react-icons/lu";

type size = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: size;
};

export const SubmitButton = ({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className={`capitalize ${className}`}
      size={size}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export const CardSignInButton = () => {
  return (
    <SignInButton mode={"modal"}>
      <Button
        type="button"
        size={"icon"}
        variant={"outline"}
        className="p-2 cursor-pointer"
        asChild
      >
        <FaHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={"outline"}
      size={"icon"}
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <Loader2 className=" animate-spin" />
      ) : isFavorite ? (
        <FaHeart className="text-primary" />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

type actionType = "edit" | "delete";

export const DeleteIconButton = ({
  actionType,
}: {
  actionType: actionType;
}) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LuPenSquare />;
      case "delete":
        return <LuTrash />;
      default:
        return <LuTrash />;
    }
  };
  return (
    <Button
      size={"icon"}
      type={"submit"}
      variant={"link"}
      className="p-2 cursor-pointer"
    >
      {pending ? <Loader2 className=" animate-spin" /> : renderIcon()}
    </Button>
  );
};
