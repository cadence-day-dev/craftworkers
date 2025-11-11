"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";

export default function Dashboard() {
  return (
    <main>
      <Container>
        <Intro />
        <article className="mb-2.5 md:mb-32">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-md md:text-lg tracking-wider leading-tight mb-12 text-left uppercase font-normal">
              Internal tools
            </h1>
            
            <div className="text-lg leading-relaxed">
              <p className="mb-6">
                Insert time realated information here
              </p>
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}