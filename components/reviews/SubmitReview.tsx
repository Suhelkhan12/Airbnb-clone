"use client";
import { useState } from "react";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { Card } from "../ui/card";
import RatingInput from "../form/RatingInput";
import { Button } from "../ui/button";
import { createReviewAction } from "@/actions/actions";
import DescriptionInput from "../form/DescriptionInput";

const SubmitReview = ({ propertyId }: { propertyId: string }) => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((p) => !p);
  };

  return (
    <div className="mt-8">
      <Button onClick={toggleFormVisibility}>
        {isFormVisible ? "Hide review form" : "Leave a review"}
      </Button>
      {isFormVisible && (
        <Card className="p-4 mt-6">
          <FormContainer action={createReviewAction}>
            {/* so that we can relate review with a property */}
            <input type="hidden" name="propertyId" value={propertyId} />
            <div className=" flex flex-col gap-4">
              <RatingInput name="rating" />
              <DescriptionInput
                name="comment"
                labelText="Your thoughts about the property"
                defaultValue="Enter comment here..."
              />
            </div>
            <SubmitButton />
          </FormContainer>
        </Card>
      )}
    </div>
  );
};
export default SubmitReview;
