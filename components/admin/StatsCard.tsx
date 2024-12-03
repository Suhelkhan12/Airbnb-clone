import React from "react";
import { Card, CardHeader } from "../ui/card";

type StatsCardProps = {
  title: string;
  value: number;
};
const StatsCard = ({ title, value }: StatsCardProps) => {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className=" capitalize text-xl md:text-3xl font-bold ">{title}</h2>
        <span className=" text-primary text-3xl md:text-5xl font-extrabold">
          {value}
        </span>
      </CardHeader>
    </Card>
  );
};

export default StatsCard;
