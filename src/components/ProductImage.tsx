import Image from "next/image";
import BottleArt from "./BottleArt";

export default function ProductImage({
  image,
  category,
  name,
  className,
  sizes,
  priority,
}: {
  image: string | null;
  category: string;
  name: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        fill
        sizes={sizes ?? "(min-width: 1024px) 20vw, 50vw"}
        className={`object-contain ${className ?? ""}`}
        priority={priority}
      />
    );
  }
  return <BottleArt category={category} name={name} className={className} />;
}
