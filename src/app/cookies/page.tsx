import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";

export default function Cookies() {
  return (
    <main>
      <Container>
        <Intro />
        <article className="mb-2.5 md:mb-32">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-lg md:text-xl tracking-wider leading-tight mb-12 text-left uppercase font-normal">
              COOKIE POLICY
            </h1>
            
            <div className="text-lg leading-relaxed">
              <h2 className="text-xl mb-4 font-normal uppercase">What are cookies?</h2>
              
              <p className="mb-6">
                Cookies are small text files, which are set by us in your web browser. Cookies store data that enhances your experience of the website; they also enable us to gather anonymous information on website use, which we can use to improve our service to you; they are also used by some of our third-party service providers, again to track usage and to save data between pages.
              </p>
              
              <h2 className="text-xl mb-4 font-normal uppercase">How we use cookies</h2>
              
              <p className="mb-6">We use cookies to:</p>
              
              <ul className="mb-6 list-disc list-inside">
                <li>To operate our services</li>
                <li>Anonymously record and analyse website usage</li>
              </ul>
              
              <p className="mb-6">
                We may also use cookies to personalise your experience on our website, by recognising you and tailoring content or product and service offerings.
              </p>
              
              <h2 className="text-xl mb-4 font-normal uppercase">How to control or delete cookies</h2>
              
              <p className="mb-6">
                The majority of web browsers automatically enable cookies as a default setting. To stop cookies being stored on your computer in future, you'll need to alter the settings of your web browser. You should also be able to delete cookies via your browser settings.
              </p>
              
              <p className="mb-6">
                You can find instructions on how to control or delete cookies by clicking 'Help' in your browser's menu bar, or by following these browser-by-browser instructions from <a href="https://www.aboutcookies.org" className="hover:underline">AboutCookies.org</a>.
              </p>
              
              <p className="mb-6">
                For Google Analytics cookies you can also stop Google from collecting your information by downloading and installing the <a href="https://tools.google.com/dlpage/gaoptout" className="hover:underline">Google Analytics Opt-out Browser Add-on</a>.
              </p>
              
              <p className="mb-6">
                You may withdraw your consent for cookies to be set. Please note that by itself this action will neither delete any cookies nor prevent the future setting of cookies.
              </p>
              
              <p className="mb-2.5 md:mb-6">
                Please note that by deleting our cookies or preventing future cookies your experience on our website will be limited.
              </p>
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}