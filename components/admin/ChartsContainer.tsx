import { fetchChartsData } from "@/actions/actions";
import Chart from "./Chart";

const ChartsContainer = async () => {
  const bookings = await fetchChartsData();
  if (bookings.length === 0) return null;

  return <Chart data={bookings} />;
};

export default ChartsContainer;
