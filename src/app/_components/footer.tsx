import Container from "@/app/_components/container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-10  border-neutral-200 mt-12">
      <Container>
        <div className="py-4 md:py-4 flex flex-col md:flex-row items-start justify-between gap-8">
          
        <div className="flex gap-6 text-xs  uppercase tracking-wider">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/work" className="hover:underline">Work</Link>
            <Link href="/dashboard" className="hover:underline">PORTAL</Link>
            {/* <Link href="/process" className="hover:underline">INSTAGRAM</Link> */}
          </div>
          {/* Newsletter Subscription */}
          {/* <div className="flex-1 max-w-md">
            <h3 className="text-sm font-normal mb-4 uppercase tracking-wider">
              SUBSCRIBE TO OUR NEWSLETTER
            </h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-none text-sm focus:outline-none focus:border-black"
              />
              <button className="px-6 py-2 bg-white text-blacks  border border-gray-300 text-sm font-normal uppercase tracking-wider hover:bg-gray-800">
                SUBSCRIBE
              </button>
            </div>
          </div> */}
  
        </div>
        
        {/* Bottom Links */}
        <div className="border-t border-gray-200 pt-4 pb-4 flex justify-end gap-6 text-xs uppercase tracking-wider">
          {/* <Link href="/privacy" className="hover:underline">PRIVACY POLICY</Link> */}
          <Link href="/cookies" className="hover:underline">COOKIE POLICY</Link>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
