"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const fetchClientSecret = useCallback(async () => {
    // creating a checkout session
    const response = await axios.post("/api/payment", {
      bookingId,
    });
    return response.data.clientSecret;
  }, []);

  const options = { fetchClientSecret };
  return (
    <div id="checkout">
      <Suspense>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </Suspense>
    </div>
  );
}
