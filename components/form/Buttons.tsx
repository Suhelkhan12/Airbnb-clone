"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
