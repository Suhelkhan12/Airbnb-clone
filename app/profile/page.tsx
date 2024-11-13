import FormContainer from "@/components/form/FormContainer";
import {
  fetchProfileAction,
  updateProfileAction,
  updateProfileImageAction,
} from "@/actions/actions";
import { SubmitButton } from "@/components/form/Buttons";
import FormInput from "@/components/form/FormInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";

const page = async () => {
  const profile = await fetchProfileAction();

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Your profile</h1>
      <div className="border p-6 rounded-md ">
        <ImageInputContainer
          action={updateProfileImageAction}
          image={profile?.profileImage as string}
          name={profile?.userName as string}
          text="Update profile image"
        />
        <FormContainer action={updateProfileAction}>
          <div className="grid grid-cols-2 gap-4 my-4">
            <FormInput
              type="text"
              name="firstName"
              label="First Name"
              placeholder="John"
              defaultValue={profile?.firstName}
            />
            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              defaultValue={profile?.lastName}
            />
            <FormInput
              type="text"
              name="userName"
              label="Username"
              placeholder="johndoe"
              defaultValue={profile?.userName}
            />
          </div>
          <SubmitButton text="Update Profile" />
        </FormContainer>
      </div>
    </section>
  );
};

export default page;
