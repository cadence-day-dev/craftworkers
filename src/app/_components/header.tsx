import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-2xl tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center font-normal">
      <Link href="/" className="hover:underline">
        C r a f t
      </Link>
      .
    </h2>
  );
};

export default Header;
