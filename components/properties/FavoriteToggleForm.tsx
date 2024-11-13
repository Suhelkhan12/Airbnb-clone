"use client";
import { CardSubmitButton } from "../form/Buttons";
import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { toggleFavoriteAction } from "@/actions/actions";

type FavoriteToggleFormTypes = {
  favoriteId: string | null;
  propertyId: string;
};

const FavoriteToggleForm = ({
  favoriteId,
  propertyId,
}: FavoriteToggleFormTypes) => {
  const pathname = usePathname();

  const toggleAction = toggleFavoriteAction.bind(null, {
    favoriteId,
    propertyId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
};

export default FavoriteToggleForm;
