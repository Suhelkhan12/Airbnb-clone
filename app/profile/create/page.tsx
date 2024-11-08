/* eslint-disable @typescript-eslint/no-explicit-any */
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createProfileAction } from "@/actions/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  // simply redirecting the user the home page if they login and already have a profile.
  const user = await currentUser();
  if (user?.privateMetadata?.hasProfile) redirect("/");

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-6 rounded-md ">
        <FormContainer action={createProfileAction}>
          <div className="grid grid-cols-2 gap-4 my-4">
            <FormInput
              type="text"
              name="firstName"
              label="First Name"
              placeholder="John"
            />
            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Doe"
            />
            <FormInput
              type="text"
              name="userName"
              label="Username"
              placeholder="johndoe"
            />
          </div>
          <SubmitButton text="Create Profile" />
        </FormContainer>
      </div>
    </section>
  );
};

export default page;
