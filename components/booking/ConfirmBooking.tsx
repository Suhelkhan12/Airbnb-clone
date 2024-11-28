"use client";
import { createBooking } from "@/actions/actions";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { usePropertyStore } from "@/utils/store";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";

const ConfirmBooking = () => {
  const { userId } = useAuth();
  const { range, propertyId } = usePropertyStore((state) => state);

  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  if (!userId)
    return (
      <SignInButton mode={"modal"}>
        <Button type="button" className="w-full">
          Sign in to complete booking
        </Button>
      </SignInButton>
    );

  const createBookingAction = createBooking.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });

  return (
    <FormContainer action={createBookingAction}>
      <SubmitButton text="Reserve" className="w-full" />
    </FormContainer>
  );
};

export default ConfirmBooking;
