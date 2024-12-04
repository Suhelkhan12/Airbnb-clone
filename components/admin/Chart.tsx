"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartPropTypes = {
  data: {
    date: string;
    count: number;
  }[];
};

const Chart = ({ data }: ChartPropTypes) => {
  return (
    <>
      <h3 className="text-2xl font-semibold mt-8">Monthly bookings</h3>
      <div className="mt-4">
        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart data={data} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey={"date"} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" barSize={"75"} fill="#E11D48"></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
