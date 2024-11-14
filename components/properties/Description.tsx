"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import Title from "./Title";

const Description = ({ description }: { description: string }) => {
  const [isFullDescription, setIsFullDescription] = useState<boolean>(false);

  const toggleDescription = () => {
    setIsFullDescription((p) => !p);
  };

  // spliting description in words
  const wordsInDescription = description.split(" ");
  // boolean bases on the words in the description string
  const isLongDescription = wordsInDescription.length > 40;

  const displayedDescription =
    isLongDescription && !isFullDescription
      ? wordsInDescription.slice(0, 40).join(" ") + "..."
      : description;

  return (
    <article className="mt-4">
      <Title text="Description" />
      <p className=" text-muted-foreground font-light leading-loose">
        {displayedDescription}
      </p>
      {isLongDescription && (
        <Button
          type="button"
          variant={"link"}
          size={"sm"}
          onClick={toggleDescription}
          className="p-0"
        >
          {isFullDescription ? "Show less" : "Show more"}
        </Button>
      )}
    </article>
  );
};

export default Description;
