import { findCountryByCode } from "@/utils/countries";

const CountryFlagAndName = ({ countryCode }: { countryCode: string }) => {
  const validCountry = findCountryByCode(countryCode);

  const countryName =
    validCountry!.name.length > 20
      ? `${validCountry?.name.substring(0, 29)}...`
      : validCountry!.name;

  return (
    <span className="flex justify-between items-center gap-2 text-sm font-medium">
      {countryName}
    </span>
  );
};

export default CountryFlagAndName;
