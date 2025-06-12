"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./container";
import Title from "./title";

gsap.registerPlugin(ScrollTrigger);

const How = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Video animation
      gsap.fromTo(
        ".how-video",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".how-video",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Title
      gsap.fromTo(
        ".how-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".how-title",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Paragraph 1
      gsap.fromTo(
        ".how-p1",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".how-p1",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Paragraph 2
      gsap.fromTo(
        ".how-p2",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".how-p2",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-1 md:grid-cols-5 bg-primary text-secondary w-full overflow-hidden"
    >
      <Container className="col-span-2 flex flex-col justify-center py-10">
        <Title
          level={2}
          className="text-secondary mb-4 leading-tight how-title"
        >
          Lorem <br /> consect apng.
        </Title>
        <p className="font-semibold mt-8 text-base md:text-lg how-p1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          <span className="font-extrabold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </span>
        </p>
        <p className="mt-6 text-base md:text-lg max-w-xl font-light how-p2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          eos ipsa commodi perspiciatis voluptates dignissimos adipisci animi
          molestias labore vitae. Beatae explicabo saepe reprehenderit tenetur
          possimus ullam suscipit delectus nemo corrupti quas cumque, nihil, eos
          quod? Ipsum alias tempora saepe?
        </p>
      </Container>
      <div className="col-span-3 flex items-center justify-center w-full how-video">
        <video
          src="https://assets.lumion.com/f/180614/x/1e9bc043d3/new-fine-detail-nature-showcase-2024.mp4"
          controls={false}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
};

export default How;
