import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
  aspectRatio?: string;
};

const CoverImage = ({ title, src, slug, aspectRatio = "aspect-[1.5/1]" }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full h-full object-cover", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1300}
      height={200}
    />
  );
  return (
    <div className={`sm:mx-0 ${aspectRatio} overflow-hidden`}>
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
