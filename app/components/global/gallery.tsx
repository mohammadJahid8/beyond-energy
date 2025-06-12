"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./container";
import Title from "./title";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title and description
      gsap.from(".gallery-text > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Animate each .gallery-card
      gsap.utils.toArray(".gallery-card").forEach((card: any, i: number) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Container ref={sectionRef} className="w-full py-32">
      {/* Text Content */}
      <div className="gallery-text">
        <Title
          level={2}
          className="text-primary dark:text-primary-foreground mb-4"
        >
          Lorem ipsum dolor sit amet elit.
        </Title>
        <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          ratione! Ducimus enim illo fugiat magnam veniam? Molestiae doloribus
          alias dicta numquam ducimus sit porro laboriosam ea? Consequatur,
          porro repudiandae! Nobis molestiae fuga eius similique, quod nesciunt
          commodi est, aut in illo quo exercitationem assumenda voluptatum
          dolorem modi enim provident possimus?
        </p>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8 mb-10">
        <div className="rounded-md overflow-hidden w-full bg-muted flex items-center justify-center md:col-span-4 gallery-card relative">
          <img
            src="https://assets.lumion.com/f/180614/4627x4627/c47f8de447/photogrammetry-trees-with-volumetrics-square.jpeg/m/1440x0"
            className="object-cover w-full h-full"
            alt="Gallery"
          />
        </div>
        <div className="rounded-md overflow-hidden w-full bg-muted flex items-center justify-center md:col-span-6 gallery-card relative">
          <video
            src="https://assets.lumion.com/f/180614/x/bd4b17db15/photogrammetry-trees-2025.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8 mb-10">
        <div className="rounded-md overflow-hidden w-full bg-muted flex items-center justify-center md:col-span-6 gallery-card relative">
          <video
            src="https://assets.lumion.com/f/180614/x/1fd49c2d4b/landscape-design-fine-detail-tree-animation.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </div>

        <div className="rounded-md overflow-hidden w-full bg-muted flex items-center justify-center md:col-span-4 gallery-card relative">
          <video
            src="https://assets.lumion.com/f/180614/x/aa2ad69bc8/landscape-design-rendering-landscape-materials.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8">
        <div className="rounded-md overflow-hidden w-full bg-muted flex items-center justify-center md:col-span-4 gallery-card relative">
          <img
            src="https://assets.lumion.com/f/180614/1440x1440/5369fb0528/architectrural-design-creeping-plants-render.jpg/m/1440x0"
            className="object-cover w-full h-full"
            alt="Gallery"
          />
        </div>
        <div className="rounded-md overflow-hidden w-full bg-muted flex items-center justify-center md:col-span-6 gallery-card relative">
          <video
            src="https://assets.lumion.com/f/180614/x/66ce44c923/green-wall-landscape-orbit.mp4"
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
