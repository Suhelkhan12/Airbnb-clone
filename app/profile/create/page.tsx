/* eslint-disable @typescript-eslint/no-explicit-any */
import console from "console";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";

const createProfileAction = async (prevState: any, formData: FormData) => {
  "use server";
  const firstName = formData.get("firstName");
  console.log(firstName);
  await new Promise((res) => setTimeout(res, 2000));
  return { message: "Profile created" };
};

const page = () => {
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
              name="username"
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
