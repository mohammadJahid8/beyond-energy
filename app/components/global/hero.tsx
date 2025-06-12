"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./container";
import Title from "./title";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        scrollTrigger: {
          trigger: ".hero-title",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".hero-description", {
        scrollTrigger: {
          trigger: ".hero-description",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".video-left", {
        scrollTrigger: {
          trigger: ".video-left",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".video-right", {
        scrollTrigger: {
          trigger: ".video-right",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Container ref={containerRef} className="w-full py-32">
      <Title
        level={2}
        className="hero-title text-primary dark:text-primary-foreground mb-4"
      >
        Dial in the light
      </Title>
      <p className="hero-description text-base md:text-lg text-muted-foreground mb-10 max-w-2xl">
        See how your design interacts with{" "}
        <span className="font-semibold text-primary-foreground">
          natural light
        </span>{" "}
        at different{" "}
        <span className="font-semibold text-primary-foreground">
          times of day
        </span>{" "}
        to refine your design with clarity and precision. Quickly add and adjust
        artificial lighting with{" "}
        <span className="font-semibold text-primary-foreground">
          point, spot, area, and line lights
        </span>
        .
      </p>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8">
        <div className="video-left rounded-md overflow-hidden w-full bg-muted flex items-center justify-center md:col-span-4">
          <video
            src="https://assets.lumion.com/f/180614/x/493e65d934/view-lights-animation-tower-square.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </div>
        <div className="video-right rounded-md overflow-hidden w-full bg-muted flex items-center justify-center md:col-span-6">
          <video
            src="https://assets.lumion.com/f/180614/x/8812d0a76d/sun-study-view-no-graphics.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </Container>
  );
}
