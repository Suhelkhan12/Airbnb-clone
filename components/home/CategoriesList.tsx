import { categories } from "@/utility/types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";

const CategoriesList = ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const searchTerm = search ? `&search=${search}` : "";
  return (
    <section>
      <ScrollArea className="py-4">
        <div className="flex gap-4">
          {categories.map((ct) => {
            const isActive = ct.label === category;
            return (
              <Link key={ct.label} href={`/?category=${ct.label}${searchTerm}`}>
                <article
                  className={`py-2 flex flex-col items-center rounded-md cursor-pointer duration-300 hover:bg-primary hover:text-white w-[6rem] ${
                    isActive ? " bg-primary" : ""
                  }`}
                >
                  <ct.icon className=" w-5 h-5" />
                  <p className=" capitalize text-base mt-1">{ct.label}</p>
                </article>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation={"horizontal"} />
      </ScrollArea>
    </section>
  );
};

export default CategoriesList;
