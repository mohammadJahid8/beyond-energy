"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { Button } from "../ui/button";
// import Title from "./title";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Banner() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Circular reveal background
      tl.fromTo(
        container.current,
        {
          clipPath: "ellipse(0% 0% at 0% 0%)",
        },
        {
          clipPath: "ellipse(150% 150% at 0% 0%)",
          duration: 1.4,
          ease: "power2.out",
        }
      );

      // Text reveal using GSAP TextPlugin
      tl.fromTo(
        titleRef.current,
        { text: "" },
        {
          text: "Discover Design Proposals",
          duration: 1.8,
          ease: "power1.inOut",
        }
      );

      // Rest of the content fade in
      tl.from(".text-new", {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
        .from(".text-description", { y: 30, opacity: 0, duration: 0.8 }, "<0.2")
        .from(".text-button", { y: 20, opacity: 0, duration: 0.6 }, "<0.2")
        .from(
          ".video-container",
          { scale: 0.95, opacity: 0, duration: 1, ease: "power2.out" },
          "<0.2"
        );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="grid grid-cols-1 md:grid-cols-2 bg-primary w-full overflow-hidden"
      style={{
        clipPath: "circle(0% at 0% 0%)",
      }}
    >
      <div className="flex flex-col justify-center text-secondary px-5 md:pl-16 md:pr-0 py-20 md:py-40">
        <span className="text-xl font-semibold mb-2 text-new">New</span>

        {/* Animated text target */}
        <h1
          ref={titleRef}
          className="text-title text-4xl md:text-6xl font-bold leading-tight mb-4"
        >
          {/* Start with empty text */}
        </h1>

        <p className="text-lg md:text-2xl mb-6 max-w-lg font-light text-description">
          Explore, refine, visualize—right inside your modeling tool. Now
          available for SketchUp.
        </p>
        <Button className="bg-accent w-max text-button">Get Started</Button>
      </div>

      <div className="flex items-center justify-center video-container">
        <video
          src="https://assets.lumion.com/f/180614/x/e144dd01b2/mediterranean-villa-slow-pan.mp4"
          controls={false}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          poster="https://placehold.co/400x400?text=Banner+Video"
        />
      </div>
    </section>
  );
}
