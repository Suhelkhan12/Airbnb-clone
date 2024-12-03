import { fetchStatistics } from "@/actions/actions";
import StatsCard from "./StatsCard";

const StatsContainer = async () => {
  const { usersCount, bookingCount, propertyCount } = await fetchStatistics();

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3 mt-8">
      <StatsCard title="users" value={usersCount || 0} />
      <StatsCard title="properties" value={propertyCount || 0} />
      <StatsCard title="bookings" value={bookingCount || 0} />
    </div>
  );
};

export default StatsContainer;
