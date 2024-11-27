import React from "react";

const Comment = ({ userComment }: { userComment: string }) => {
  return <p className="text-sm">{userComment}</p>;
};

export default Comment;
