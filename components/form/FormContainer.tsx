"use client";

import { useActionState } from "react";
import React, { useEffect } from "react";
import { toast } from "sonner";

import { type actionType } from "@/utility/types";

const initialState = {
  message: "",
};

type FormContainerProps = {
  children: React.ReactNode;
  action: actionType;
};

const FormContainer = ({ children, action }: FormContainerProps) => {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
