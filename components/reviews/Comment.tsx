"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const Comment = ({ userComment }: { userComment: string }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const commentToShow =
    !isExpanded && userComment.length > 100
      ? userComment.slice(0, 100) + "..."
      : userComment;

  const handleClick = () => setIsExpanded((p) => !p);
  return (
    <div className="text-sm  ">
      <p>
        {commentToShow}
        {userComment.length > 100 && (
          <Button
            size={"sm"}
            variant={"link"}
            className="p-0 mt-0 ml-1"
            onClick={handleClick}
          >
            Show {isExpanded ? "less" : "more"}
          </Button>
        )}
      </p>
    </div>
  );
};

export default Comment;
