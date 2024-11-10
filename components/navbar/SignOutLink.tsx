"use client";
import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import { toast } from "sonner";

const SignOutLink = () => {
  const handleLogout = () => {
    toast.warning("You are being signed out!");
  };

  return (
    <SignOutButton redirectUrl="/">
      <button className="w-full text-left" onClick={handleLogout}>
        Logout
      </button>
    </SignOutButton>
  );
};

export default SignOutLink;
