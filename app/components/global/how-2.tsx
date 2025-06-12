"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./container";
import Title from "./title";

gsap.registerPlugin(ScrollTrigger);

const How2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate video block
      gsap.from(".how2-video", {
        scrollTrigger: {
          trigger: ".how2-video",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // Animate title
      gsap.from(".how2-title", {
        scrollTrigger: {
          trigger: ".how2-title",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animate first paragraph
      gsap.from(".how2-p1", {
        scrollTrigger: {
          trigger: ".how2-p1",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animate second paragraph
      gsap.from(".how2-p2", {
        scrollTrigger: {
          trigger: ".how2-p2",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Container
      ref={sectionRef}
      className="grid grid-cols-1 md:grid-cols-5 text-primary dark:text-primary-foreground w-full overflow-hidden my-24"
    >
      <div className="col-span-3 flex items-center justify-center w-full order-2 md:order-1 how2-video">
        <video
          src="https://assets.lumion.com/f/180614/x/9e24075cf1/lumion-landscape-rendering-showcase.mp4"
          controls={false}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full rounded-md"
        />
      </div>

      <div className="col-span-2 flex flex-col justify-center px-0 md:px-10 py-10 order-1 md:order-2">
        <Title level={2} className="mb-4 leading-tight how2-title">
          Lorem <br /> consect apng.
        </Title>
        <p className="font-semibold mt-8 text-base md:text-lg how2-p1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          <span className="font-extrabold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </span>
        </p>
        <p className="mt-6 text-base md:text-lg max-w-xl font-light how2-p2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          eos ipsa commodi perspiciatis voluptates dignissimos adipisci animi
          molestias labore vitae. Beatae explicabo saepe reprehenderit tenetur
          possimus ullam suscipit delectus nemo corrupti quas cumque, nihil, eos
          quod? Ipsum alias tempora saepe?
        </p>
      </div>
    </Container>
  );
};

export default How2;
