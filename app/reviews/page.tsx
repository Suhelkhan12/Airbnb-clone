import {
  deleteReviewAction,
  fetchPropertyReviewsByUserAction,
} from "@/actions/actions";
import ReviewCard from "@/components/reviews/ReviewCard";
import FormContainer from "@/components/form/FormContainer";
import { DeleteIconButton } from "@/components/form/Buttons";
import EmptyList from "@/components/home/EmptyList";

const page = async () => {
  const reviews = await fetchPropertyReviewsByUserAction();
  if (reviews.length === 0) {
    return <EmptyList />;
  }
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        Properties you have reviewed
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { image: profileImage, name: firstName } = review.property;
          const reviewInfo = { comment, rating, profileImage, firstName };
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview id={review.id} />
            </ReviewCard>
          );
        })}
      </div>
    </section>
  );
};

export default page;

const DeleteReview = ({ id }: { id: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { id });
  return (
    <FormContainer action={deleteReview}>
      <DeleteIconButton actionType="delete" />
    </FormContainer>
  );
};
