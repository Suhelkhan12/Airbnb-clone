import { fetchFavorites } from "@/actions/actions";
import PropertiesList from "@/components/home/PropertiesList";
import EmptyList from "@/components/home/EmptyList";

const page = async () => {
  const favorites = await fetchFavorites();
  if (favorites.length === 0) {
    return <EmptyList />;
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold capitalize">Favorites list</h1>
      <PropertiesList properties={favorites} />
    </div>
  );
};

export default page;
