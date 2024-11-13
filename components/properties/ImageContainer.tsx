import Image from "next/image";

const ImageContainer = ({
  mainImage,
  name,
}: {
  mainImage: string;
  name: string;
}) => {
  return (
    <div className="relative h-[20rem] sm:h-[25rem] md:h-[40rem] w-full mt-8">
      <Image
        src={mainImage}
        alt={name}
        fill
        sizes="100vw"
        priority
        className="rounded-md"
      />
    </div>
  );
};

export default ImageContainer;
