"use client";
import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";
import { LuMinus, LuPlus } from "react-icons/lu";

type CounterInputType = {
  detail: string;
  defaultValue?: number;
};

const CounterInput = ({ detail, defaultValue }: CounterInputType) => {
  const [count, setCount] = useState<number>(defaultValue || 0);

  const handleCounterIncreament = () => {
    setCount((p) => p + 1);
  };

  const handleCounterDecreament = () => {
    setCount((p) => {
      return p > 0 ? p - 1 : p;
    });
  };
  return (
    <Card>
      <input type="hidden" name={detail} value={count} />
      <CardHeader className=" flex flex-col gap-y-5 sm:p-6 p-4">
        <div className="flex items-center gap-6 sm:justify-between flex-wrap ">
          <div className="flex flex-col">
            <h2 className=" font-medium capitalize">{detail}</h2>
            <p className=" text-muted-foreground text-sm">
              Specify the number of {detail}
            </p>
          </div>
          <div className="flex  items-center gap-4">
            <Button
              variant={"outline"}
              size={"icon"}
              type="button"
              onClick={handleCounterDecreament}
            >
              <LuMinus className=" text-primary" />
            </Button>
            <span className=" text-xl font-bold w-5 text-clip">{count}</span>
            <Button
              variant={"outline"}
              size={"icon"}
              type="button"
              onClick={handleCounterIncreament}
            >
              <LuPlus className=" text-primary" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default CounterInput;
