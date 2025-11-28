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
            <h1 className="text-lg md:text-lg tracking-wider leading-tight text-left  font-normal">
              Demo
            </h1>
            
            <div className="text-md leading-relaxed">
              <img src="/assets/blog/systems/cover.png" alt="Demo" className="w-full h-auto" />
            </div>
            <p className="mb-6">
               This is our demo 
              </p>
          </div>
        </article>
      </Container>
    </main>
  );
}