/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Rating from "./Rating";
import Comment from "./Comment";

type ReviewCardProps = {
  reviewInfo: {
    rating: number;
    comment: string;
    firstName: string;
    profileImage: string;
  };
  children?: React.ReactNode;
};

const ReviewCard = (props: ReviewCardProps) => {
  const {
    rating,
    comment: userComment,
    firstName,
    profileImage,
  } = props.reviewInfo;

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center">
          <img
            src={profileImage}
            alt={firstName}
            className="size-8 rounded-full object-cover"
          />
          <div className="ml-4">
            <h3 className="text-sm font-semibold capitalize mb-1">
              {firstName}
            </h3>
            <Rating rating={rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment userComment={userComment} />
      </CardContent>
      {/* Delte button later */}
      <div className=" absolute top-4 right-4">{props.children}</div>
    </Card>
  );
};

export default ReviewCard;
