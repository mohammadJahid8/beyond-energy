"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./container";
import { Button } from "@/app/components/ui/button";
import Title from "./title";

gsap.registerPlugin(ScrollTrigger);

const ContactCta = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Expand flat full-width background from center
      gsap.fromTo(
        bgRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Text animation
      gsap.from(".cta-text > *", {
        scale: 0.95,
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Buttons
      gsap.from(".cta-btn-1", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse ",
        },
      });

      gsap.from(".cta-btn-2", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
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
    <section
      ref={sectionRef}
      className="w-full relative py-20 flex items-center justify-center min-h-[400px] overflow-hidden"
    >
      {/* Flat expanding full-width background */}
      <div ref={bgRef} className="absolute inset-0 bg-primary scale-y-0 z-0" />

      {/* Content stays above */}
      <Container className="w-full relative z-10">
        <div className="text-center w-full max-w-4xl mx-auto px-2 cta-text">
          <Title
            level={1}
            className="text-secondary font-semibold mb-6 md:mb-8"
          >
            Contact us now
          </Title>
          <p className="text-base md:text-xl text-secondary mb-8 md:mb-12 max-w-3xl mx-auto font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum amet
            vel saepe vitae accusantium. Eveniet ratione unde soluta velit
            deleniti.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
            <Button
              variant="secondary"
              size="lg"
              className="rounded h-12 text-base w-auto text-primary cta-btn-1 hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Click here
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-secondary text-secondary rounded h-12 text-base w-auto cta-btn-2 hover:bg-secondary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              See plans
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactCta;
