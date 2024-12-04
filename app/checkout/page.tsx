"use client";

import React from "react";
import { Suspense } from "react";
import CheckoutPage from "./_component/Checkout";

const page = () => {
  return (
    <Suspense>
      <CheckoutPage />
    </Suspense>
  );
};

export default page;
