"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";

export default function Work() {
  return (
    <main>
      <Container>
        <Intro />
        <article className="mb-2.5 md:mb-32">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-md md:text-lg tracking-wider leading-tight mb-12 text-left uppercase font-normal">
              Product
            </h1>
            
            <div className="text-lg leading-relaxed">
              <p className="mb-6">
                This is our current experiements with the product. We imagine it as a 
              </p>
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}