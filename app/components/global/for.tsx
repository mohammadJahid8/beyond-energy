"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./container";
import Title from "./title";

gsap.registerPlugin(ScrollTrigger);

const For: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const items = [
    {
      title: "Architectural design",
      description:
        "Bring your structures to life with the greatest ease, in the highest quality",
    },
    {
      title: "Interior design",
      description:
        "Visualize interior spaces as if they are ready to be lived or worked in",
    },
    {
      title: "Urban planning",
      description: "Show how communities will experience your urban designs",
    },
    {
      title: "Education",
      description: "Lumion is free for students and faculties around the world",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each border underline and content
      gsap.utils.toArray(".for-item").forEach((el: any) => {
        const border = el.querySelector(".border-line");
        const content = el.querySelector(".content");

        gsap.fromTo(
          border,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        gsap.fromTo(
          content,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Container ref={sectionRef} className="bg-primary text-secondary py-20">
      <Title level={2} className="mb-20">
        Beyond Energy Design for
      </Title>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {items.map((item, idx) => (
          <div key={idx} className="for-item">
            <div className="content mb-6">
              <Title level={4} className="mb-4">
                {item.title}
              </Title>
              <p className="text-base md:text-lg text-secondary">
                {item.description}
              </p>
            </div>
            <div className="border-b border-secondary border-line origin-left scale-x-0"></div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default For;
