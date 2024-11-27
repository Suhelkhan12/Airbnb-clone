import { fetchPropertyReviewsByUserAction } from "@/actions/actions";
import Title from "../properties/Title";
import ReviewCard from "./ReviewCard";

const PropertyReviews = async ({ propertyId }: { propertyId: string }) => {
  const reviews = await fetchPropertyReviewsByUserAction(propertyId);
  if (reviews.length === 0) return null;
  return (
    <div className="mt-8">
      <Title text="Property reviews" />
      <div className="grid md:grid-cols-3 gap-8 mt-4">
        {reviews.map((review) => {
          const { rating, comment } = review;
          const { firstName, profileImage } = review.profile;
          const reviewInfo = { rating, comment, firstName, profileImage };

          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
};

export default PropertyReviews;
