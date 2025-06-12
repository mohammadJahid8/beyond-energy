"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./container";
import Title from "./title";
import ReactCompareImage from "react-compare-image";

gsap.registerPlugin(ScrollTrigger);

const Comparison = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      gsap.from(".comparison-text > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Compare slider fade + upward motion (no scale!)
      gsap.from(".comparison-slider", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Container
      ref={sectionRef}
      className="grid grid-cols-1 md:grid-cols-5 text-primary dark:text-primary-foreground w-full overflow-hidden my-24"
    >
      <div className="col-span-2 flex flex-col justify-center px-0 md:px-10 py-10 comparison-text">
        <Title level={2} className="mb-4 leading-tight">
          Lorem <br /> consect apng.
        </Title>
        <p className="font-semibold mt-8 text-base md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          <span className="font-extrabold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </span>
        </p>
        <p className="mt-6 text-base md:text-lg max-w-xl font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          eos ipsa commodi perspiciatis voluptates dignissimos adipisci animi
          molestias labore vitae. Beatae explicabo saepe reprehenderit tenetur
          possimus ullam suscipit delectus nemo corrupti quas cumque, nihil, eos
          quod? Ipsum alias tempora saepe?
        </p>
      </div>

      <div className="col-span-3 flex items-center justify-center w-full">
        <div className="comparison-slider w-full max-w-4xl">
          <ReactCompareImage
            leftImage="https://assets.lumion.com/f/180614/1920x1080/bea8ca164b/forest-with-paint-placement.jpg/m/3000x0"
            rightImage="https://assets.lumion.com/f/180614/1920x1080/2ec08f530c/forest-without-paint-placement.jpg/m/2048x0"
            sliderLineWidth={2}
            sliderLineColor="white"
            handleSize={40}
            hover={true}
          />
        </div>
      </div>
    </Container>
  );
};

export default Comparison;
